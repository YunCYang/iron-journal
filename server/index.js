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
  if (!req.body.userName) next(new ClientError('missing user name', 400));
  else if (!req.body.email) next(new ClientError('missing email', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const pwdTest = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?=.{8,})/;
  if (!pwdTest.exec(req.body.password)) next(new ClientError('password is not valid', 400));
  const checkUserNameSql = `
    select "userName"
      from "user"
     where "userName" = $1;
  `;
  const checkEmailSql = `
    select "email"
      from "user"
     where "email" = $1;
  `;
  const insertSql = `
    insert into "user" ("userName", "email", "password")
    values ($1, $2, $3)
    returning "userName", "email";
  `;
  const userNameValue = [req.body.userName];
  const emailValue = [req.body.email];
  if (pwdTest.exec(req.body.password)) {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) next(err);
      const insertValue = [req.body.userName, req.body.email, hash];
      db.query(checkUserNameSql, userNameValue)
        .then(userNameResult => {
          if (userNameResult.rows[0]) next(new ClientError(`user name ${req.body.userName} already exists`, 400));
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
  if (!req.body.userName) next(new ClientError('missing user name', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const sql = `
    select "userName", "password", "userId"
      from "user"
     where "userName" = $1;
  `;
  const value = [req.body.userName];
  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) next(new ClientError(`user name ${req.body.userName} does not exist`, 404));
      else {
        bcrypt.compare(req.body.password, result.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) {
            res.status(200).json({
              userId: result.rows[0].userId,
              userName: result.rows[0].userName,
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
    returning "userId", "userName";
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
  if (!req.body.userName) next(new ClientError('missing user name', 400));
  else if (!req.body.password) next(new ClientError('missing password', 400));
  const searchSql = `
    select "userName", "password"
      from "user"
     where "userName" = $1;
  `;
  const deleteSql = `
    delete from "user"
     where "userName" = $1;
  `;
  const value = [req.body.userName];
  db.query(searchSql, value)
    .then(searchResult => {
      if (!searchResult.rows[0]) next(new ClientError(`user name ${req.body.userName} does not exist`, 404));
      else {
        bcrypt.compare(req.body.password, searchResult.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) {
            db.query(deleteSql, value)
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
  if (!req.body.userName) next(new ClientError('missing user name', 400));
  else if (!req.body.oldPassword) next(new ClientError('missing old password', 400));
  else if (!req.body.newPassword) next(new ClientError('missing new password', 400));
  const pwdTest = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?=.{8,})/;
  if (!pwdTest.exec(req.body.newPassword)) next(new ClientError('new password is not valid', 400));
  const searchSql = `
    select "userName", "password"
      from "user"
     where "userName" = $1;
  `;
  const updatePwSql = `
    update "user"
       set "password" = $1
     where "userName" = $2
    returning *;
  `;
  const searchValue = [req.body.userName];
  db.query(searchSql, searchValue)
    .then(searchResult => {
      if (!searchResult.rows[0]) next(new ClientError(`user name ${req.body.userName} does not exist`, 404));
      else {
        bcrypt.compare(req.body.oldPassword, searchResult.rows[0].password, (err, pwdResult) => {
          if (err) next(err);
          if (pwdResult) {
            bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
              if (err) next(err);
              const updateValue = [hash, req.body.userName];
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
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
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
  intTest(req.body.stat_edge, next);
  intTest(req.body.stat_heart, next);
  intTest(req.body.stat_iron, next);
  intTest(req.body.stat_shadow, next);
  intTest(req.body.stat_wits, next);
  const createCharacterSql = `
    insert into "character" ("characterName", "asset", "location")
    values ($1, ARRAY [$2, $3, $4], $5)
    returning "characterId";
  `;
  const updateStatSql = `
    update "character"
       set "stat" = ARRAY [$1::integer, $2::integer, $3::integer, $4::integer, $5::integer]
     where "characterId" = $6;
  `;
  const updateBond1Sql = `
    update "character"
       set "bond" = ARRAY [$1]
     where "characterId" = $2;
  `;
  const updateBond2Sql = `
    update "character"
       set "bond" = ARRAY [$1, $2]
     where "characterId" = $3;
  `;
  const updateBond3Sql = `
    update "character"
       set "bond" = ARRAY [$1, $2, $3]
     where "characterId" = $4;
  `;
  const createCharacterValue = [req.body.characterName, req.body.asset_1,
    req.body.asset_2, req.body.asset_3, req.body.location];
  db.query(createCharacterSql, createCharacterValue)
    .then(createResult => {
      const updateStatValue = [parseInt(req.body.stat_edge), parseInt(req.body.stat_heart),
        parseInt(req.body.stat_iron), parseInt(req.body.stat_shadow), parseInt(req.body.stat_wits),
        createResult.rows[0].characterId];
      const updateBond1Value = [req.body.bond_1, createResult.rows[0].characterId];
      const updateBond2Value = [req.body.bond_1, req.body.bond_2, createResult.rows[0].characterId];
      const updateBond3Value = [req.body.bond_1, req.body.bond_2, req.body.bond_3,
        createResult.rows[0].characterId];
      db.query(updateStatSql, updateStatValue)
        .then(statResult => {
          if (req.body.bond_3) {
            db.query(updateBond3Sql, updateBond3Value)
              .then(bondResult => res.status(201).json(createResult.rows[0].characterId))
              .catch(err => next(err));
          } else if (req.body.bond_2) {
            db.query(updateBond2Sql, updateBond2Value)
              .then(bondResult => res.status(201).json(createResult.rows[0].characterId))
              .catch(err => next(err));
          } else if (req.body.bond_1) {
            db.query(updateBond1Sql, updateBond1Value)
              .then(bondResult => res.status(201).json(createResult.rows[0].characterId))
              .catch(err => next(err));
          } else res.status(201).json(createResult.rows[0].characterId);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// edit character stat
app.put('/api/character/:characterId', (req, res, next) => {
  if (!req.params.characterId) next(new ClientError('missing character id', 400));
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
    const edgeSql = `
      update "character"
         set "stat" [1] = $1
       where "characterId" = $2
      returning "stat" [1];
    `;
    const edgeValue = [req.body.stat_edge, parseInt(req.params.characterId)];
    db.query(edgeSql, edgeValue)
      .then(edgeResult => res.status(200).json(edgeResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_heart) {
    const heartSql = `
      update "character"
         set "stat" [2] = $1
       where "characterId" = $2
      returning "stat" [2];
    `;
    const heartValue = [req.body.stat_heart, parseInt(req.params.characterId)];
    db.query(heartSql, heartValue)
      .then(heartResult => res.status(200).json(heartResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_iron) {
    const ironSql = `
      update "character"
         set "stat" [3] = $1
       where "characterId" = $2
      returning "stat" [3];
    `;
    const ironValue = [req.body.stat_iron, parseInt(req.params.characterId)];
    db.query(ironSql, ironValue)
      .then(ironResult => res.status(200).json(ironResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_shadow) {
    const shadowSql = `
      update "character"
         set "stat" [4] = $1
       where "characterId" = $2
      returning "stat" [4];
    `;
    const shadowValue = [req.body.stat_shadow, parseInt(req.params.characterId)];
    db.query(shadowSql, shadowValue)
      .then(shadowResult => res.status(200).json(shadowResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.stat_wits) {
    const witsSql = `
      update "character"
         set "stat" [5] = $1
       where "characterId" = $2
      returning "stat" [5];
    `;
    const witsValue = [req.body.stat_wits, parseInt(req.params.characterId)];
    db.query(witsSql, witsValue)
      .then(witsResult => res.status(200).json(witsResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.asset) {
    const checkAssetSql = `
      select "asset"
        from "character"
       where $1 = ANY ("asset") and "characterId" = $2;
    `;
    const selectAssetSql = `
      select "asset"
        from "character"
       where "characterId" = $1;
    `;
    const addAssetSql = `
      update "character"
         set "asset" = ARRAY_APPEND($1, $2::varchar(255))
       where "characterId" = $3
      returning "asset";
    `;
    const deleteAssetSql = `
      update "character"
         set "asset" = ARRAY_REMOVE($1, $2::varchar(255))
       where "characterId" = $3
      returning "asset";
    `;
    const checkAssetValue = [req.body.asset, parseInt(req.params.characterId)];
    const selectAssetValue = [parseInt(req.params.characterId)];
    db.query(checkAssetSql, checkAssetValue)
      .then(checkAssetResult => {
        if (!checkAssetResult.rows[0]) {
          db.query(selectAssetSql, selectAssetValue)
            .then(selectResult => {
              const assetValue = [selectResult.rows[0].asset, req.body.asset, parseInt(req.params.characterId)];
              db.query(addAssetSql, assetValue)
                .then(addAssetResult => res.status(201).json(addAssetResult.rows[0]))
                .catch(err => next(err));
            })
            .catch(err => next(err));
        } else {
          const assetValue = [checkAssetResult.rows[0].asset, req.body.asset, parseInt(req.params.characterId)];
          db.query(deleteAssetSql, assetValue)
            .then(deleteAssetResult => res.status(204).json(deleteAssetResult.rows[0]))
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  } else if (req.body.equipment) {
    const checkEquipmentSql = `
      select "equipment"
        from "character"
       where $1 = ANY ("equipment") and "characterId" = $2;
    `;
    const selectEquipmentSql = `
      select "equipment"
        from "character"
       where "characterId" = $1;
    `;
    const addEquipmentSql = `
      update "character"
         set "equipment" = ARRAY_APPEND($1, $2::varchar(255))
       where "characterId" = $3
      returning "equipment";
    `;
    const deleteEquipmentSql = `
      update "character"
         set "equipment" = ARRAY_REMOVE($1, $2::varchar(255))
       where "characterId" = $3
      returning "equipment";
    `;
    const checkEquipmentValue = [req.body.equipment, parseInt(req.params.characterId)];
    const selectEquipmentValue = [parseInt(req.params.characterId)];
    db.query(checkEquipmentSql, checkEquipmentValue)
      .then(checkEquipmentResult => {
        if (!checkEquipmentResult.rows[0]) {
          db.query(selectEquipmentSql, selectEquipmentValue)
            .then(selectResult => {
              const equipmentValue = [selectResult.rows[0].equipment, req.body.equipment, parseInt(req.params.characterId)];
              db.query(addEquipmentSql, equipmentValue)
                .then(addEquipmentResult => res.status(201).json(addEquipmentResult.rows[0]))
                .catch(err => next(err));
            })
            .catch(err => next(err));
        } else {
          const equipmentValue = [checkEquipmentResult.rows[0].equipment, req.body.equipment, parseInt(req.params.characterId)];
          db.query(deleteEquipmentSql, equipmentValue)
            .then(deleteEquipmentResult => res.status(204).json(deleteEquipmentResult.rows[0]))
            .catch(err => next(err));
        }
      })
      .catch(err => next(err));
  } else if (req.body.location) {
    const locationSql = `
      update "character"
         set "location" = $1
       where "location" = $2
      returning "location";
    `;
    const locationValue = [req.body.location, parseInt(req.params.characterId)];
    db.query(locationSql, locationValue)
      .then(locationResult => res.status(200).json(locationResult.rows[0]))
      .catch(err => next(err));
  } else if (req.body.bond) {
    const checkBondSql = `
      select "bond"
        from "character"
       where $1 = ANY ("bond") and "characterId" = $2;
    `;
    const selectBondSql = `
      select "bond"
        from "character"
       where "characterId" = $1;
    `;
    const addBondSql = `
      update "character"
         set "bond" = ARRAY_APPEND($1, $2::varchar(255))
       where "characterId" = $3
      returning "bond";
    `;
    const deleteBondSql = `
      update "character"
         set "bond" = ARRAY_REMOVE($1, $2::varchar(255))
       where "characterId" = $3
      returning "bond";
    `;
    const checkBondValue = [req.body.bond, parseInt(req.params.characterId)];
    const selectBondValue = [parseInt(req.params.characterId)];
    db.query(checkBondSql, checkBondValue)
      .then(checkBondResult => {
        if (!checkBondResult.rows[0]) {
          db.query(selectBondSql, selectBondValue)
            .then(selectResult => {
              const bondValue = [selectResult.rows[0].bond, req.body.bond, parseInt(req.params.characterId)];
              db.query(addBondSql, bondValue)
                .then(addBondResult => res.status(201).json(addBondResult.rows[0]))
                .catch(err => next(err));
            })
            .catch(err => next(err));
        } else {
          const bondValue = [checkBondResult.rows[0].bond, req.body.bond, parseInt(req.params.characterId)];
          db.query(deleteBondSql, bondValue)
            .then(deleteBondResult => res.status(204).json(deleteBondResult.rows[0]))
            .catch(err => next(err));
        }
      })
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
  const value = [parseInt(req.params.characterId)];
  db.query(getSql, value)
    .then(getResult => {
      if (!getResult.rows[0]) next(new ClientError(`character id ${req.params.characterId} does not exist`, 404));
      else {
        db.query(deleteSql, value)
          .then(deleteResult => res.status(204).json([]))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});
// get vow
app.get('/api/vow', (req, res, next) => { });

// create vow
app.post('/api/vow', (req, res, next) => { });

// edit vow
app.put('/api/vow', (req, res, next) => { });

// delete vow
app.delete('/api/vow', (req, res, next) => { });

// get log
app.get('/api/log', (req, res, next) => { });

// add log
app.post('/api/log', (req, res, next) => { });

// delete log
app.delete('/api/log', (req, res, next) => { });

// // get route from user
// app.get('/api/route/all/:userId', (req, res, next) => {
//   intTest(req.params.userId, next);
//   const checkUserSql = `
//     select "userId"
//       from "route"
//      where "userId" = $1;
//   `;
//   const getRouteSql = `
//     select "routeId", "name", "grade", "location", "completed"
//       from "route"
//      where "userId" = $1
//      order by "completed" DESC;
//   `;
//   const userValue = [parseInt(req.params.userId)];
//   db.query(checkUserSql, userValue)
//     .then(userResult => {
//       if (!userResult.rows[0]) next(new ClientError(`user of id ${req.params.userId} does not exist`, 404));
//       else {
//         db.query(getRouteSql, userValue)
//           .then(routeResult => {
//             res.status(200).json(routeResult.rows);
//           })
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });
// // get single route information using route id
// app.get('/api/route/detail/:userId/:routeId', (req, res, next) => {
//   intTest(req.params.userId, next);
//   intTest(req.params.routeId, next);
//   const checkUserSql = `
//     select "userId"
//       from "route"
//      where "userId" = $1;
//   `;
//   const getRouteSql = `
//     select *
//       from "route"
//      where "userId" = $1 and "routeId" = $2;
//   `;
//   const checkUserValue = [parseInt(req.params.userId)];
//   const getRouteValue = [parseInt(req.params.userId), parseInt(req.params.routeId)];
//   db.query(checkUserSql, checkUserValue)
//     .then(userResult => {
//       if (!userResult.rows[0]) next(new ClientError(`user of id ${req.params.userId} does not exist`, 404));
//       else {
//         db.query(getRouteSql, getRouteValue)
//           .then(routeResult => {
//             if (!routeResult.rows[0]) next(new ClientError(`route of id ${req.params.routeId} does not exist`, 404));
//             else res.status(200).json(routeResult.rows[0]);
//           })
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });
// // get best grade
// app.get('/api/stat/best/:userId', (req, res, next) => {
//   intTest(req.params.userId, next);
//   const checkUserSql = `
//     select "userId"
//       from "route"
//      where "userId" = $1;
//   `;
//   const getGradeSql = `
//     select "grade"
//       from "route"
//      where "userId" = $1
//      order by "grade" desc
//      limit 1;
//   `;
//   const userValue = [parseInt(req.params.userId)];
//   db.query(checkUserSql, userValue)
//     .then(userResult => {
//       if (!userResult.rows[0]) next(new ClientError(`user of id ${req.params.userId} does not exist`, 404));
//       else {
//         db.query(getGradeSql, userValue)
//           .then(getGradeResult => res.status(200).json(getGradeResult.rows[0]))
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });
// // get favorite location
// app.get('/api/stat/favLoc/:userId', (req, res, next) => {
//   intTest(req.params.userId, next);
//   const checkUserSql = `
//     select "userId"
//       from "route"
//      where "userId" = $1;
//   `;
//   const getLocSql = `
//     select "location", count("location")
//       from "route"
//      where "userId" = $1
//      group by "location"
//      order by count desc
//      limit 1;
//   `;
//   const userValue = [parseInt(req.params.userId)];
//   db.query(checkUserSql, userValue)
//     .then(userResult => {
//       if (!userResult.rows[0]) next(new ClientError(`user of id ${req.params.userId} does not exist`, 404));
//       else {
//         db.query(getLocSql, userValue)
//           .then(getLocResult => res.status(200).json(getLocResult.rows[0]))
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });
// // get attempts for grade
// app.get('/api/stat/avgAtmp/:userId/:grade', (req, res, next) => {
//   intTest(req.params.userId, next);
//   intTest(req.params.grade, next);
//   const checkGradeSql = `
//     select "grade"
//       from "route"
//      where "userId" = $1 and "grade" = $2;
//   `;
//   const getAtmpSql = `
//     select "attempts"
//       from "route"
//      where "userId" = $1 and "grade" = $2;
//   `;
//   const atmpValue = [parseInt(req.params.userId), parseInt(req.params.grade)];
//   db.query(checkGradeSql, atmpValue)
//     .then(gradeResult => {
//       if (!gradeResult.rows[0]) next(new ClientError('user id or grade does not exist', 404));
//       else {
//         db.query(getAtmpSql, atmpValue)
//           .then(atmpResult => res.status(200).json(atmpResult.rows))
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });
// // add new route
// app.post('/api/route/add', (req, res, next) => {
//   if (!req.body.userId) next(new ClientError('missing user id', 400));
//   else if (!req.body.name) next(new ClientError('missing name', 400));
//   else if (!req.body.grade) next(new ClientError('missing grade', 400));
//   else if (!req.body.attempt) next(new ClientError('missing attempts', 400));
//   else if (!req.body.location) next(new ClientError('missing location', 400));
//   else if (!req.body.locationType) next(new ClientError('missing location type', 400));
//   else if (!req.body.completed) next(new ClientError('missing completed time', 400));
//   if (req.body.userId) intTest(req.body.userId, next);
//   if (req.body.routeId) intTest(req.body.routeId, next);
//   if (req.body.attempt) intTest(req.body.attempt, next);
//   if (req.body.angle !== 'null') intTest(req.body.angle, next);
//   if (req.body.locationType && typeof req.body.locationType !== 'boolean') next(new ClientError(`${req.body.locationType} is not a valid boolean`, 400));
//   if (req.body.completed) {
//     if (!dateTest(req.body.completed)) next(new ClientError(`${req.body.completed} is not a valid date`, 400));
//   }
//   const checkUserIdSql = `
//     select "userId"
//       from "user"
//      where "userId" = $1;
//   `;
//   const postRouteSql = `
//     insert into "route" ("name", "grade", "userId", "location", "locationType", "attempts", "angle", "completed", "note")
//     values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     returning *;
//   `;
//   const checkUserValue = [parseInt(req.body.userId)];
//   const postRouteValue = [req.body.name, parseInt(req.body.grade),
//   parseInt(req.body.userId), req.body.location, req.body.locationType === 'true',
//   parseInt(req.body.attempt), req.body.angle === 'null' ? null : parseInt(req.body.angle),
//   req.body.completed, req.body.note];
//   db.query(checkUserIdSql, checkUserValue)
//     .then(checkUserResult => {
//       if (!checkUserResult.rows[0]) next(new ClientError(`user id ${req.body.userId} does not exist`, 404));
//       else {
//         db.query(postRouteSql, postRouteValue)
//           .then(postRouteResult => res.status(201).json(postRouteResult.rows[0]))
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });
// // edit and update routes
// app.put('/api/route/update', (req, res, next) => {
//   if (!req.body.routeId) next(new ClientError('missing route id', 400));
//   else if (!req.body.name) next(new ClientError('missing name', 400));
//   else if (!req.body.grade) next(new ClientError('missing grade', 400));
//   else if (!req.body.attempt) next(new ClientError('missing attempts', 400));
//   else if (!req.body.location) next(new ClientError('missing location', 400));
//   else if (!req.body.locationType) next(new ClientError('missing location type', 400));
//   else if (!req.body.completed) next(new ClientError('missing completed time', 400));
//   if (req.body.routeId) intTest(req.body.routeId, next);
//   if (req.body.attempt) intTest(req.body.attempt, next);
//   if (req.body.angle) intTest(req.body.angle, next);
//   if (req.body.locationType && typeof req.body.locationType !== 'boolean') next(new ClientError(`${req.body.locationType} is not a valid boolean`, 400));
//   if (req.body.completed) {
//     if (!dateTest(req.body.completed)) next(new ClientError(`${req.body.completed} is not a valid date`, 400));
//   }
//   const checkRouteIdSql = `
//     select "routeId"
//       from "route"
//      where "routeId" = $1;
//   `;
//   const updateRouteSql = `
//     update "route"
//        set "name" = $1,
//            "grade" = $2,
//            "attempts" = $3,
//            "location" = $4,
//            "locationType" = $5,
//            "completed" = $6,
//            "angle" = $7,
//            "note" = $8
//      where "routeId" = $9
//      returning *;
//   `;
//   const checkRouteIdValue = [parseInt(req.body.routeId)];
//   const updateRouteValue = [req.body.name, parseInt(req.body.grade),
//   parseInt(req.body.attempt), req.body.location, req.body.locationType,
//   req.body.completed, req.body.angle === 'null' ? null : parseInt(req.body.angle),
//   req.body.note, parseInt(req.body.routeId)];
//   db.query(checkRouteIdSql, checkRouteIdValue)
//     .then(checkRouteIdResult => {
//       if (!checkRouteIdResult.rows[0]) next(new ClientError(`route id ${req.body.routeId} does not exist`, 404));
//       else {
//         db.query(updateRouteSql, updateRouteValue)
//           .then(updateResult => res.status(201).json(updateResult.rows[0]))
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });
// // delete route
// app.delete('/api/route/delete', (req, res, next) => {
//   if (!req.body.userId) next(new ClientError('missing user id', 400));
//   else if (!req.body.routeId) next(new ClientError('missing route id', 400));
//   if (req.body.userId) intTest(req.body.userId, next);
//   if (req.body.routeId) intTest(req.body.routeId, next);
//   const checkUserIdSql = `
//     select "userId"
//       from "route"
//      where "userId" = $1;
//   `;
//   const checkRouteIdSql = `
//     select "routeId"
//       from "route"
//      where "routeId" = $1 and "userId" = $2;
//   `;
//   const deleteRouteSql = `
//     delete from "route"
//      where "routeId" = $1;
//   `;
//   const checkUserIdValue = [parseInt(req.body.userId)];
//   const checkRouteIdValue = [parseInt(req.body.routeId), parseInt(req.body.userId)];
//   const deleteRouteValue = [parseInt(req.body.routeId)];
//   db.query(checkUserIdSql, checkUserIdValue)
//     .then(checkUserResult => {
//       if (!checkUserResult.rows[0]) next(new ClientError(`user id ${req.body.userId} does not exist`, 404));
//       else {
//         db.query(checkRouteIdSql, checkRouteIdValue)
//           .then(checkRouteResult => {
//             if (!checkRouteResult.rows[0]) next(new ClientError(`route id ${req.body.routeId} does not exist`, 404));
//             else {
//               db.query(deleteRouteSql, deleteRouteValue)
//                 .then(deleteRouteResult => res.status(204).json([]))
//                 .catch(err => next(err));
//             }
//           })
//           .catch(err => next(err));
//       }
//     })
//     .catch(err => next(err));
// });

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
