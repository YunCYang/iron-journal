require('dotenv/config');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const emailTemplate = require('./email');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

const intTest = (id, next) => {
  const test = /^[0-9]\d*$/;
  if (!test.exec(id)) {
    return next(new ClientError(`id ${id} is not a valid positive integer`, 400));
  } else return null;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
});

// sign up
app.post('/api/auth/signup', (req, res, next) => {
  const saltRounds = 11;
  if (!req.body.username) next(new ClientError('missing user name', 400));
  else if (!req.body.email) next(new ClientError('missing email', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const pwdTest = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?=.{8,32})/;
  if (!pwdTest.exec(req.body.password)) next(new ClientError('password is not valid', 400));
  const checkUsernameSql = `
    select "username"
      from "user"
     where "username" = $1;
  `;
  const checkEmailSql = `
    select "email"
      from "user"
     where "email" = $1;
  `;
  const insertSql = `
    insert into "user" ("username", "email", "password")
    values ($1, $2, $3)
    returning "username", "email";
  `;
  const usernameValue = [req.body.username];
  const emailValue = [req.body.email];
  if (pwdTest.exec(req.body.password)) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) next(err);
      const insertValue = [req.body.username, req.body.email, hash];
      db.query(checkUsernameSql, usernameValue)
        .then(usernameResult => {
          if (usernameResult.rows[0]) next(new ClientError(`user name ${req.body.username} already exists`, 400));
          else {
            db.query(checkEmailSql, emailValue)
              .then(emailResult => {
                if (emailResult.rows[0]) next(new ClientError(`email ${req.body.email} already exists`, 400));
                else {
                  db.query(insertSql, insertValue)
                    .then(insertResult => res.status(201).json({
                      account: insertResult.rows[0],
                      status: 201
                    }))
                    .catch(err => next(err));
                }
              })
              .catch(err => next(err));
          }
        })
        .catch(err => next(err));
    });
  }
});

// log in
app.post('/api/auth/login', (req, res, next) => {
  if (!req.body.username) next(new ClientError('missing user name', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const sql = `
    select "username", "password", "userId"
      from "user"
     where "username" = $1;
  `;
  const value = [req.body.username];
  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) next(new ClientError(`user name ${req.body.username} does not exist`, 404));
      else {
        bcrypt.compare(req.body.password, result.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) {
            res.status(200).json({
              userId: result.rows[0].userId,
              username: result.rows[0].username,
              status: 200
            });
          } else next(new ClientError('password does not match', 401));
        });
      }
    })
    .catch(err => next(err));
});

// send reset password email
app.post('/api/auth/reset', (req, res, next) => {
  if (!req.body.email) next(new ClientError('missing email', 400));
  const getUserInfoSql = `
    select "userId", "password", "createdAt"
      from "user"
     where "email" = $1;
  `;
  const getUserInfoValue = [req.body.email];
  db.query(getUserInfoSql, getUserInfoValue)
    .then(getUserInfoResult => {
      if (getUserInfoResult.rows[0]) {
        const secret = getUserInfoResult.rows[0].password + '-' +
          getUserInfoResult.rows[0].createdAt;
        let token = jwt.sign({ userId: getUserInfoResult.rows[0].userId }, secret, {
          expiresIn: 3600
        });
        const tokenArray = token.split('');
        for (let i = 0; i < tokenArray.length; i++) {
          if (tokenArray[i] === '.') tokenArray.splice(i, 1, 'd', 'o', 't', 'd', 'o', 't');
        }
        token = tokenArray.join('');
        const resetUrl = `http://localhost:3000/account/password/reset/${getUserInfoResult.rows[0].userId}/${token}`;
        transporter.sendMail(emailTemplate(req.body.email, resetUrl),
          (err, info) => {
            if (err) next(new ClientError('error sending email', 500));
            else res.status(200).json([]);
          });
      } else next(new ClientError(`email ${req.body.email} does not exist`, 404));
    })
    .catch(err => next(err));
});
app.put('/api/auth/update', (req, res, next) => {
  const saltRounds = 11;
  if (!req.body.userId) next(new ClientError('missing user id', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  else if (!req.body.token) next(new ClientError('missing token', 400));
  intTest(req.body.userId, next);
  const pwdTest = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?=.{8,})/;
  if (!pwdTest.exec(req.body.password)) next(new ClientError('password is not valid', 400));
  const checkUserIdSql = `
    select "userId", "password", "createdAt"
      from "user"
     where "userId" = $1
  `;
  const updatePasswordSql = `
    update "user"
       set "password" = $1
     where "userId" = $2
    returning "userId", "username";
  `;
  const checkUserIdValue = [parseInt(req.body.userId)];
  const tokenArray = req.body.token.split('');
  let counter = 0;
  for (let i = 0; i < tokenArray.length; i++) {
    if (i + 5 < tokenArray.length) {
      if (tokenArray[i] === 'd' && tokenArray[i + 1] === 'o' &&
        tokenArray[i + 2] === 't' && tokenArray[i + 3] === 'd' &&
        tokenArray[i + 4] === 'o' && tokenArray[i + 5] === 't') {
        tokenArray.splice(i, 6, '.');
        counter++;
      }
    }
  }
  if (counter < 2) next(new ClientError('token is not valid', 400));
  const processedToken = tokenArray.join('');
  db.query(checkUserIdSql, checkUserIdValue)
    .then(checkUserIdResult => {
      if (!checkUserIdResult.rows[0]) next(new ClientError(`user of id ${req.body.userId} does not exist`, 404));
      else {
        const secret = checkUserIdResult.rows[0].password + '-' + checkUserIdResult.rows[0].createdAt;
        const payload = jwt.decode(processedToken, secret);
        if (payload.userId !== req.body.userId) {
          next(new ClientError('user id does not match', 400));
        } else {
          bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) next(err);
            const updatePasswordValue = [hash, parseInt(req.body.userId)];
            db.query(updatePasswordSql, updatePasswordValue)
              .then(updatePasswordResult => res.status(200).json(updatePasswordResult.rows[0]))
              .catch(err => next(err));
          });
        }
      }
    })
    .catch(err => next(err));
});

// delete account
app.delete('/api/auth/delete', (req, res, next) => {
  if (!req.body.username) next(new ClientError('missing user name', 400));
  else if (!req.body.userId) next(new ClientError('missing user id', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  intTest(req.body.userId, next);
  const searchSql = `
    select "username", "password"
      from "user"
     where "username" = $1;
  `;
  const deleteSql = `
    delete from "user"
     where "userId" = $1;
  `;
  const value = [req.body.username];
  const deleteValue = [parseInt(req.body.userId)];
  db.query(searchSql, value)
    .then(searchResult => {
      if (!searchResult.rows[0]) next(new ClientError(`user name ${req.body.username} does not exist`, 404));
      else {
        bcrypt.compare(req.body.password, searchResult.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) {
            db.query(deleteSql, deleteValue)
              .then(deleteResult => res.status(204).json([]))
              .catch(err => next(err));
          } else next(new ClientError('password does not match', 401));
        });
      }
    })
    .catch(err => next(err));
});

// change password
app.put('/api/auth/password', (req, res, next) => {
  const saltRounds = 11;
  if (!req.body.username) next(new ClientError('missing user name', 400));
  else if (!req.body.oldPassword) next(new ClientError('missing old password', 400));
  else if (!req.body.newPassword) next(new ClientError('missing new password', 400));
  const pwdTest = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?=.{8,})/;
  if (!pwdTest.exec(req.body.newPassword)) next(new ClientError('new password is not valid', 400));
  const searchSql = `
    select "username", "password"
      from "user"
     where "username" = $1;
  `;
  const updatePwSql = `
    update "user"
       set "password" = $1
     where "username" = $2
    returning *;
  `;
  const searchValue = [req.body.username];
  db.query(searchSql, searchValue)
    .then(searchResult => {
      if (!searchResult.rows[0]) next(new ClientError(`user name ${req.body.username} does not exist`, 404));
      else {
        bcrypt.compare(req.body.oldPassword, searchResult.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) {
            bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
              if (err) next(err);
              const updateValue = [hash, req.body.username];
              db.query(updatePwSql, updateValue)
                .then(updateResult => res.status(200).json([]))
                .catch(err => next(err));
            });
          } else next(new ClientError('password does not match', 401));
        });
      }
    })
    .catch(err => next(err));
});

// get character
app.get('/api/character/:characterId', (req, res, next) => {
  intTest(req.params.characterId, next);
  const sql = `
    select *
      from "character"
     where "characterId" = $1;
  `;
  const value = [parseInt(req.params.characterId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

// get all characters
app.get('/api/character/:userId', (req, res, next) => {
  intTest(req.params.userId, next);
  const sql = `
    select *
      from "character" c
      left join "userCharacter" u on c."characterId" = u."charaterId"
     where "userId" = $1;
  `;
  const value = [parseInt(req.params.userId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// create character
app.post('/api/character', (req, res, next) => {
  if (!req.body.characterName) next(new ClientError('missing character name', 400));
  else if (!req.body.stat_edge) next(new ClientError('missing stat - edge', 400));
  else if (!req.body.stat_heart) next(new ClientError('missing stat - heart', 400));
  else if (!req.body.stat_iron) next(new ClientError('missing stat - iron', 400));
  else if (!req.body.stat_shadow) next(new ClientError('missing stat - shadow', 400));
  else if (!req.body.stat_wits) next(new ClientError('missing stat - wits', 400));
  else if (!req.body.asset_1) next(new ClientError('missing first asset', 400));
  else if (!req.body.asset_2) next(new ClientError('missing second asset', 400));
  else if (!req.body.asset_3) next(new ClientError('missing third asset', 400));
  else if (!req.body.location) next(new ClientError('missing location', 400));
  else if (!req.body.bond) next(new ClientError('missing bond', 400));
  else if (!req.body.userId) next(new ClientError('missing user id', 400));
  intTest(req.body.stat_edge, next);
  intTest(req.body.stat_heart, next);
  intTest(req.body.stat_iron, next);
  intTest(req.body.stat_shadow, next);
  intTest(req.body.stat_wits, next);
  intTest(req.body.bond, next);
  intTest(req.body.userId, next);
  const createCharacterSql = `
    insert into "character" ("characterName", "edge", "heart", "iron", "shadow",
      "wits", "bond", "location", "asset")
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    returning "characterId";
  `;
  const setUserCharacterSql = `
    insert into "userCharacter" ("userId", "characterId")
    values ($1, $2);
  `;
  const createCharacterValue = [req.body.characterName, parseInt(req.body.stat_edge),
    parseInt(req.body.stat_heart), parseInt(req.body.stat_iron), parseInt(req.body.stat_shadow),
    parseInt(req.body.stat_wits), parseInt(req.body.bond), req.body.location, req.body.asset_1,
    req.body.asset_2, req.body.asset_3];
  db.query(createCharacterSql, createCharacterValue)
    .then(createResult => {
      const setUserCharacterValue = [req.body.userId, createResult.rows[0].characterId];
      db.query(setUserCharacterSql, setUserCharacterValue)
        .then(setUCResult => res.status(201).json(createResult.rows[0].characterId))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// edit character stat
app.put('/api/character/:characterId', (req, res, next) => {
  intTest(req.params.characterId, next);
  if (req.body.characterName) {
    const nameSql = `
      update "character"
         set "characterName" = $1
       where "characterId" = $2
      returning "characterName";
    `;
    const nameValue = [req.body.characterName, parseInt(req.params.characterId)];
    db.query(nameSql, nameValue)
      .then(nameResult => res.status(200).json(nameResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_edge) {
    intTest(req.body.stat_edge, next);
    const edgeSql = `
      update "character"
         set "edge" = $1
       where "characterId" = $2
      returning "edge";
    `;
    const edgeValue = [parseInt(req.body.stat_edge), parseInt(req.params.characterId)];
    db.query(edgeSql, edgeValue)
      .then(edgeResult => res.status(200).json(edgeResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_heart) {
    intTest(req.body.stat_heart, next);
    const heartSql = `
      update "character"
         set "heart" = $1
       where "characterId" = $2
      returning "heart";
    `;
    const heartValue = [parseInt(req.body.stat_heart), parseInt(req.params.characterId)];
    db.query(heartSql, heartValue)
      .then(heartResult => res.status(200).json(heartResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_iron) {
    intTest(req.body.stat_iron, next);
    const ironSql = `
      update "character"
         set "iron" = $1
       where "characterId" = $2
      returning "iron";
    `;
    const ironValue = [parseInt(req.body.stat_iron), parseInt(req.params.characterId)];
    db.query(ironSql, ironValue)
      .then(ironResult => res.status(200).json(ironResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_shadow) {
    intTest(req.body.stat_shadow, next);
    const shadowSql = `
      update "character"
         set "shadow" = $1
       where "characterId" = $2
      returning "shadow";
    `;
    const shadowValue = [parseInt(req.body.stat_shadow), parseInt(req.params.characterId)];
    db.query(shadowSql, shadowValue)
      .then(shadowResult => res.status(200).json(shadowResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_wits) {
    intTest(req.body.stat_wits, next);
    const witsSql = `
      update "character"
         set "wits" = $1
       where "characterId" = $2
      returning "wits";
    `;
    const witsValue = [parseInt(req.body.stat_wits), parseInt(req.params.characterId)];
    db.query(witsSql, witsValue)
      .then(witsResult => res.status(200).json(witsResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.location) {
    const locationSql = `
      update "character"
         set "location" = $1
       where "characterId" = $2
      returning "location";
    `;
    const locationValue = [req.body.location, parseInt(req.params.characterId)];
    db.query(locationSql, locationValue)
      .then(locationResult => res.status(200).json(locationResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.bond) {
    intTest(req.body.bond, next);
    const bondSql = `
      update "character"
         set "bond" = $1
       where "characterId" = $2
      returning "bond";
    `;
    const bondValue = [parseInt(req.body.bond), parseInt(req.params.characterId)];
    db.query(bondSql, bondValue)
      .then(bondResult => res.status(200).json(bondResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.exp) {
    intTest(req.body.exp, next);
    const expSql = `
      update "character"
         set "experience" = $1
       where "characterId" = $2
      returning "experience";
    `;
    const expValue = [parseInt(req.body.exp), parseInt(req.params.characterId)];
    db.query(expSql, expValue)
      .then(expResult => res.status(200).json(expResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.health) {
    intTest(req.body.health, next);
    const healthSql = `
      update "character"
         set "health" = $1
       where "characterId" = $2
      returning "health";
    `;
    const healthValue = [parseInt(req.body.health), parseInt(req.params.characterId)];
    db.query(healthSql, healthValue)
      .then(healthResult => res.status(200).json(healthResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.spirit) {
    intTest(req.body.spirit, next);
    const spiritSql = `
      update "character"
         set "spirit" = $1
       where "characterId" = $2
      returning "spirit";
    `;
    const spiritValue = [parseInt(req.body.spirit), parseInt(req.params.characterId)];
    db.query(spiritSql, spiritValue)
      .then(spiritResult => res.status(200).json(spiritResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.supply) {
    intTest(req.body.supply, next);
    const supplySql = `
      update "character"
         set "supply" = $1
       where "characterId" = $2
      returning "supply";
    `;
    const supplyValue = [parseInt(req.body.supply), parseInt(req.params.characterId)];
    db.query(supplySql, supplyValue)
      .then(supplyResult => res.status(200).json(supplyResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.momentum) {
    intTest(req.body.momentum, next);
    const momentumSql = `
      update "character"
         set "momentum" = $1
       where "characterId" = $2
      returning "momentum";
    `;
    const momentumValue = [parseInt(req.body.momentum), parseInt(req.params.characterId)];
    db.query(momentumSql, momentumValue)
      .then(momentumResult => res.status(200).json(momentumResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.maxMo) {
    intTest(req.body.maxMo, next);
    const maxMoSql = `
      update "character"
         set "maxMomentum" = $1
       where "characterId" = $2
      returning "maxMomentum";
    `;
    const maxMoValue = [parseInt(req.body.maxMo), parseInt(req.params.characterId)];
    db.query(maxMoSql, maxMoValue)
      .then(maxMoResult => res.status(200).json(maxMoResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.resetMo) {
    intTest(req.body.resetMo, next);
    const resetMoSql = `
      update "character"
         set "resetMomentum" = $1
       where "characterId" = $2
      returning "resetMomentum";
    `;
    const resetMoValue = [parseInt(req.body.resetMo), parseInt(req.params.characterId)];
    db.query(resetMoSql, resetMoValue)
      .then(resetMoResult => res.status(200).json(resetMoResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.wounded) {
    const woundedSql = `
      update "character"
         set "wounded" = $1
       where "characterId" = $2
      returning "wounded";
    `;
    const woundedValue = [req.body.wounded, parseInt(req.params.characterId)];
    db.query(woundedSql, woundedValue)
      .then(woundedResult => res.status(200).json(woundedResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.shaken) {
    const shakenSql = `
      update "character"
         set "shaken" = $1
       where "characterId" = $2
      returning "shaken";
    `;
    const shakenValue = [req.body.shaken, parseInt(req.params.characterId)];
    db.query(shakenSql, shakenValue)
      .then(shakenResult => res.status(200).json(shakenResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.unprepared) {
    const unpreparedSql = `
      update "character"
         set "unprepared" = $1
       where "characterId" = $2
      returning "unprepared";
    `;
    const unpreparedValue = [req.body.unprepared, parseInt(req.params.characterId)];
    db.query(unpreparedSql, unpreparedValue)
      .then(unpreparedResult => res.status(200).json(unpreparedResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.encumbered) {
    const encumberedSql = `
      update "character"
         set "encumbered" = $1
       where "characterId" = $2
      returning "encumbered";
    `;
    const encumberedValue = [req.body.encumbered, parseInt(req.params.characterId)];
    db.query(encumberedSql, encumberedValue)
      .then(encumberedResult => res.status(200).json(encumberedResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.maimed) {
    const maimedSql = `
      update "character"
         set "maimed" = $1
       where "characterId" = $2
      returning "maimed";
    `;
    const maimedValue = [req.body.maimed, parseInt(req.params.characterId)];
    db.query(maimedSql, maimedValue)
      .then(maimedResult => res.status(200).json(maimedResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.corrupted) {
    const corruptedSql = `
      update "character"
         set "corrupted" = $1
       where "characterId" = $2
      returning "corrupted";
    `;
    const corruptedValue = [req.body.corrupted, parseInt(req.params.characterId)];
    db.query(corruptedSql, corruptedValue)
      .then(corruptedResult => res.status(200).json(corruptedResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.cursed) {
    const cursedSql = `
      update "character"
         set "cursed" = $1
       where "characterId" = $2
      returning "cursed";
    `;
    const cursedValue = [req.body.cursed, parseInt(req.params.characterId)];
    db.query(cursedSql, cursedValue)
      .then(cursedResult => res.status(200).json(cursedResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.tormented) {
    const tormentedSql = `
      update "character"
         set "tormented" = $1
       where "characterId" = $2
      returning "tormented";
    `;
    const tormentedValue = [req.body.tormented, parseInt(req.params.characterId)];
    db.query(tormentedSql, tormentedValue)
      .then(tormentedResult => res.status(200).json(tormentedResult.rows[0]))
      .catch(err => next(err));
  }
});

// delete character
app.delete('/api/character/:characterId', (req, res, next) => {
  intTest(req.params.characterId, next);
  const getSql = `
    select "characterId"
      from "character"
     where "characterId" = $1;
  `;
  const deleteSql = `
    delete from "character"
     where "characterId" = $1;
  `;
  const deleteVowSql = `
    delete from "vow"
     where "vowId" IN (SELECT "vowId" from "characterVow" where "characterId" = $1);
  `;
  const deleteLogSql = `
    delete from "log"
     where "logId" IN (SELECT "logId" from "characterLog" where "characterId" = $1);
  `;
  const value = [parseInt(req.params.characterId)];
  db.query(getSql, value)
    .then(getResult => {
      if (!getResult.rows[0]) next(new ClientError(`character id ${req.params.characterId} does not exist`, 404));
      else {
        db.query(deleteVowSql, value)
          .then(deleteVowResult => {
            db.query(deleteLogSql, value)
              .then(deleteLogResult => {
                db.query(deleteSql, value)
                  .then(deleteResult => res.status(204).json([]))
                  .catch(err => next(err));
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// get asset
app.get('/api/asset/asset/:assetId', (req, res, next) => {});

// get all assets
app.get('/api/asset/all/:characterId', (req, res, next) => {});

// add asset
app.post('/api/asset', (req, res, next) => {});

// edit asset
app.put('/api/asset/:assetId', (req, res, next) => {});

// delete asset
app.delete('/api/asset/asset/:assetId', (req, res, next) => { });

// delete all assets
app.delete('/api/asset/all/:characterId', (req, res, next) => { });

// get vow
app.get('/api/vow/vow/:vowId', (req, res, next) => {
  intTest(req.params.vowId, next);
  const sql = `
    select *
      from "vow"
     where "vowId" = $1;
  `;
  const value = [parseInt(req.params.vowId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

// get all vows
app.get('/api/vow/all/:characterId', (req, res, next) => {
  intTest(req.params.characterId, next);
  const sql = `
    select *
      from "vow" v
      left join "characterVow" c on v."vowId" = c."vowId"
     where "characterId" = $1;
  `;
  const value = [parseInt(req.params.characterId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// create vow
app.post('/api/vow', (req, res, next) => {
  if (!req.body.characterId) next(new ClientError('missing character id', 400));
  else if (!req.body.vowName) next(new ClientError('missing vow name', 400));
  else if (!req.body.vowRank) next(new ClientError('missing vow rank', 400));
  else if (!req.body.vowProgress) next(new ClientError('missing vow progress', 400));
  else if (!req.body.vowStatus) next(new ClientError('missing vow status', 400));
  intTest(req.body.characterId, next);
  intTest(req.body.vowRank, next);
  intTest(req.body.vowProgress, next);
  const createVowSql = `
    insert into "vow" ("name", "rank", "progress", "status")
    values ($1, $2, $3, $4)
    returning "vowId";
  `;
  const setCharacterVowSql = `
    insert into "characterVow" ("characterId", "vowId")
    values ($1, $2);
  `;
  const createVowValue = [req.body.vowName, parseInt(req.body.vowRank), parseInt(req.body.vowProgress),
    req.body.vowStatus];
  db.query(createVowSql, createVowValue)
    .then(createVowResult => {
      const setCharacterVowValue = [parseInt(req.body.characterId), parseInt(createVowResult.rows[0].vowId)];
      db.query(setCharacterVowSql, setCharacterVowValue)
        .then(setCharacterVowResult => res.status(201).json(createVowResult.rows[0].vowId))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// edit vow
app.put('/api/vow/:vowId', (req, res, next) => {
  intTest(req.params.vowId, next);
  if (req.body.vowName) {
    const nameSql = `
      update "vow"
         set "name" = $1
       where "vowId" = $2
      returning "name";
    `;
    const nameValue = [req.body.vowName, parseInt(req.params.vowId)];
    db.query(nameSql, nameValue)
      .then(nameResult => res.status(200).json(nameResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.vowRank) {
    intTest(req.body.vowRank, next);
    const rankSql = `
      update "vow"
         set "rank" = $1
       where "vowId" = $2
      returning "rank";
    `;
    const rankValue = [req.body.vowRank, parseInt(req.params.vowId)];
    db.query(rankSql, rankValue)
      .then(rankResult => res.status(200).json(rankResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.vowProgress) {
    intTest(req.body.vowProgress, next);
    const progressSql = `
      update "vow"
         set "progress" = $1
       where "vowId" = $2
      returning "progress";
    `;
    const progressValue = [req.body.vowProgress, parseInt(req.params.vowId)];
    db.query(progressSql, progressValue)
      .then(progressResult => res.status(200).json(progressResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.vowStatus) {
    const statusSql = `
      update "vow"
         set "status" = $1
       where "vowId" = $2
      returning "status";
    `;
    const statusValue = [req.body.vowStatus, parseInt(req.params.vowId)];
    db.query(statusSql, statusValue)
      .then(statusResult => res.status(200).json(statusResult.rows[0]))
      .catch(err => next(err));
  }
});

// delete vow
app.delete('/api/vow/vow/:vowId', (req, res, next) => {
  intTest(req.params.vowId, next);
  const getSql = `
    select "vowId"
      from "vow"
     where "vowId" = $1;
  `;
  const deleteSql = `
    delete from "vow"
     where "vowId" = $1;
  `;
  const value = [parseInt(req.params.vowId)];
  db.query(getSql, value)
    .then(getResult => {
      if (!getResult.rows[0]) next(new ClientError(`vow id ${req.params.vowId} does not exist`, 404));
      else {
        db.query(deleteSql, value)
          .then(deleteResult => res.status(204).json([]))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// delete all vows
app.delete('/api/vow/all/:characterId', (req, res, next) => {});

// get log
app.get('/api/log/:characterId', (req, res, next) => {
  intTest(req.params.characterId, next);
  const sql = `
    select *
      from "log" l
      left join "characterLog" c on l."logId" = c."logId"
     where "characterId" = $1;
  `;
  const value = [parseInt(req.params.characterId)];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// add log
app.post('/api/log', (req, res, next) => {
  if (!req.body.characterId) next(new ClientError('missing character id', 400));
  else if (!req.body.note) next(new ClientError('missing note', 400));
  intTest(req.body.characterId, next);
  if (req.body.roll) {
    intTest(req.body.roll, next);
    const createLogSql = `
      insert into "log" ("note", "roll")
      values ($1, $2)
      returning "logId";
    `;
    const createLogValue = [req.body.note, parseInt(req.body.roll)];
    const setCharacterLogSql = `
      insert into "characterLog" ("characterId", "logId")
      values ($1, $2);
    `;
    db.query(createLogSql, createLogValue)
      .then(createLogResult => {
        const setCharacterLogValue = [parseInt(req.body.characterId), parseInt(createLogResult.rows[0].logId)];
        db.query(setCharacterLogSql, setCharacterLogValue)
          .then(setCharacterLogResult => res.status(201).json(createLogResult.rows[0].logId))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else {
    const createLogSql = `
      insert into "log" ("note")
      values ($1)
      returning "logId";
    `;
    const createLogValue = [req.body.note];
    const setCharacterLogSql = `
      insert into "characterLog" ("characterId", "logId")
      values ($1, $2);
    `;
    db.query(createLogSql, createLogValue)
      .then(createLogResult => {
        const setCharacterLogValue = [parseInt(req.body.characterId), parseInt(createLogResult.rows[0].logId)];
        db.query(setCharacterLogSql, setCharacterLogValue)
          .then(setCharacterLogResult => res.status(201).json(createLogResult.rows[0].logId))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
});

// delete log
app.delete('/api/log/:logId', (req, res, next) => {
  intTest(req.params.logId, next);
  const getSql = `
    select "logId"
      from "log"
     where "logId" = $1;
  `;
  const deleteSql = `
    delete from "log"
     where "logId" = $1;
  `;
  const value = [parseInt(req.params.logId)];
  db.query(getSql, value)
    .then(getResult => {
      if (!getResult.rows[0]) next(new ClientError(`log id ${req.params.logId} does not exist`, 404));
      else {
        db.query(deleteSql, value)
          .then(deleteResult => res.status(204).json([]))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message, status: err.status });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

module.exports = app;
