/**
 * @jest-environment node
 */

const app = require('./index');
const supertest = require('supertest');
const request = supertest(app);

describe('Initial Jest Test', () => {
  it('test true is true', () => {
    expect(true).toBe(true);
  });

  it('health check', async done => {
    const response = await request.get('/api/health-check');
    expect(response.body.message).toBe('successfully connected');
    done();
  });

  it('game', async done => {
    const emptyRes = await request.post('/api/auth/signup').send({});
    expect(emptyRes.status).toBe(400);
    expect(emptyRes.body.error).toBe('missing user name');
    const noEmailRes = await request.post('/api/auth/signup').send({
      username: 'alex'
    });
    expect(noEmailRes.status).toBe(400);
    expect(noEmailRes.body.error).toBe('missing email');
    const noPwdRes = await request.post('/api/auth/signup').send({
      username: 'alex',
      email: 'alex@gmail.com'
    });
    expect(noPwdRes.status).toBe(400);
    expect(noPwdRes.body.error).toBe('missing password');
    const invalidPasswordRes = await request.post('/api/auth/signup').send({
      username: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123'
    });
    expect(invalidPasswordRes.status).toBe(400);
    expect(invalidPasswordRes.body.error).toBe('password is not valid');
    const createUserRes = await request.post('/api/auth/signup').send({
      username: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(createUserRes.status).toBe(201);
    const duplicateUserRes = await request.post('/api/auth/signup').send({
      username: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(duplicateUserRes.status).toBe(400);
    expect(duplicateUserRes.body.error).toBe('user name alex already exists');
    const duplicateEmailRes = await request.post('/api/auth/signup').send({
      username: 'alex6',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(duplicateEmailRes.status).toBe(400);
    expect(duplicateEmailRes.body.error).toBe('email alex@gmail.com already exists');

    const wrongPwdLoginRes = await request.post('/api/auth/login').send({
      username: 'alex',
      password: 'Abcd124!'
    });
    expect(wrongPwdLoginRes.status).toBe(401);
    expect(wrongPwdLoginRes.body.error).toBe('password does not match');
    const loginRes = await request.post('/api/auth/login').send({
      username: 'alex',
      password: 'Abcd123!'
    });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body.userId).not.toBeUndefined();

    const emptyCharacterRes = await request.post('/api/character').send({});
    expect(emptyCharacterRes.status).toBe(400);
    expect(emptyCharacterRes.body.error).toBe('missing character name');
    const createCharacterRes = await request.post('/api/character').send({
      characterName: 'Percy',
      stat_edge: 1,
      stat_heart: 2,
      stat_iron: 3,
      stat_shadow: 4,
      stat_wits: 5,
      location: 'location a',
      bond: 2,
      userId: loginRes.body.userId
    });
    expect(createCharacterRes.status).toBe(201);
    expect(typeof createCharacterRes.body).toBe('number');

    const getCharacterRes = await request.get(`/api/character/${createCharacterRes.body}`);
    expect(getCharacterRes.status).toBe(200);
    expect(getCharacterRes.body.health).toBe(5);

    const editCharacterNameRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      characterName: 'Vex'
    });
    expect(editCharacterNameRes.status).toBe(200);
    expect(editCharacterNameRes.body.characterName).toBe('Vex');
    const editCharacterEdgeRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_edge: 6
    });
    expect(editCharacterEdgeRes.status).toBe(200);
    expect(editCharacterEdgeRes.body.edge).toBe(6);
    const editCharacterHeartRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_heart: 7
    });
    expect(editCharacterHeartRes.status).toBe(200);
    expect(editCharacterHeartRes.body.heart).toBe(7);
    const editCharacterIronRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_iron: 8
    });
    expect(editCharacterIronRes.status).toBe(200);
    expect(editCharacterIronRes.body.iron).toBe(8);
    const editCharacterShadowRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_shadow: 9
    });
    expect(editCharacterShadowRes.status).toBe(200);
    expect(editCharacterShadowRes.body.shadow).toBe(9);
    const editCharacterWitsRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_wits: 10
    });
    expect(editCharacterWitsRes.status).toBe(200);
    expect(editCharacterWitsRes.body.wits).toBe(10);
    const editCharacterLocationRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      location: 'location b'
    });
    expect(editCharacterLocationRes.status).toBe(200);
    expect(editCharacterLocationRes.body.location).toBe('location b');
    const editCharacterBondRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      bond: 3
    });
    expect(editCharacterBondRes.status).toBe(200);
    expect(editCharacterBondRes.body.bond).toBe(3);

    const missAssetOption2Res = await request.post('/api/asset').send({
      assetName: 'asset1',
      health: 1,
      option1: true,
      option3: false,
      characterId: createCharacterRes.body
    });
    expect(missAssetOption2Res.status).toBe(400);
    expect(missAssetOption2Res.body.error).toBe('missing asset option 2');
    const createAssetRes = await request.post('/api/asset').send({
      assetName: 'asset 1',
      health: 1,
      option1: true,
      option2: false,
      option3: false,
      uniqueName: 'special name',
      characterId: createCharacterRes.body
    });
    expect(createAssetRes.status).toBe(201);
    expect(typeof createAssetRes.body).toBe('number');
    const getAssetRes = await request.get(`/api/asset/asset/${createAssetRes.body}`);
    expect(getAssetRes.status).toBe(200);
    expect(getAssetRes.body.health).toBe(1);
    const editAssetNameRes = await request.put(`/api/asset/${createAssetRes.body}`).send({
      uniqueName: 'changed name'
    });
    expect(editAssetNameRes.status).toBe(200);
    expect(editAssetNameRes.body.uniqueName).toBe('changed name');
    const editAssetOption1Res = await request.put(`/api/asset/${createAssetRes.body}`).send({
      option1: false
    });
    expect(editAssetOption1Res.status).toBe(200);
    expect(editAssetOption1Res.body.option1).toBe(false);
    const editAssetOption2Res = await request.put(`/api/asset/${createAssetRes.body}`).send({
      option2: true
    });
    expect(editAssetOption2Res.status).toBe(200);
    const editAssetOption3Res = await request.put(`/api/asset/${createAssetRes.body}`).send({
      option3: true
    });
    expect(editAssetOption3Res.status).toBe(200);
    expect(editAssetOption3Res.body.option3).toBe(true);
    const deleteAssetRes = await request.delete(`/api/asset/asset/${createAssetRes.body}`);
    expect(deleteAssetRes.status).toBe(204);

    const missVowNameRes = await request.post('/api/vow').send({
      vowRank: 1,
      vowProgress: 2,
      vowStatus: 3,
      characterId: createCharacterRes.body
    });
    expect(missVowNameRes.status).toBe(400);
    expect(missVowNameRes.body.error).toBe('missing vow name');
    const createVowRes = await request.post('/api/vow').send({
      vowName: 'vow 1',
      vowRank: 1,
      vowProgress: 2,
      vowStatus: 3,
      characterId: createCharacterRes.body
    });
    expect(createVowRes.status).toBe(201);
    expect(typeof createVowRes.body).toBe('number');
    const getVowRes = await request.get(`/api/vow/vow/${createVowRes.body}`);
    expect(getVowRes.status).toBe(200);
    expect(getVowRes.body.rank).toBe(1);
    const editVowNameRes = await request.put(`/api/vow/${createVowRes.body}`).send({
      vowName: 'vow 2'
    });
    expect(editVowNameRes.status).toBe(200);
    expect(editVowNameRes.body.name).toBe('vow 2');
    const editVowRankRes = await request.put(`/api/vow/${createVowRes.body}`).send({
      vowRank: 4
    });
    expect(editVowRankRes.status).toBe(200);
    expect(editVowRankRes.body.rank).toBe(4);
    const editVowProgressRes = await request.put(`/api/vow/${createVowRes.body}`).send({
      vowProgress: 5
    });
    expect(editVowProgressRes.status).toBe(200);
    expect(editVowProgressRes.body.progress).toBe(5);
    const editVowStatusRes = await request.put(`/api/vow/${createVowRes.body}`).send({
      vowStatus: 6
    });
    expect(editVowStatusRes.status).toBe(200);
    expect(editVowStatusRes.body.status).toBe('6');
    const deleteVowRes = await request.delete(`/api/vow/vow/${createVowRes.body}`);
    expect(deleteVowRes.status).toBe(204);

    const missLogNoteRes = await request.post('/api/log').send({
      roll: 1,
      characterId: createCharacterRes.body
    });
    expect(missLogNoteRes.status).toBe(400);
    expect(missLogNoteRes.body.error).toBe('missing note');
    const createLogRes = await request.post('/api/log').send({
      note: 'note 1',
      roll: 1,
      characterId: createCharacterRes.body
    });
    expect(createLogRes.status).toBe(201);
    expect(typeof createLogRes.body).toBe('number');
    const getLogRes = await request.get(`/api/log/${createLogRes.body}`);
    expect(getLogRes.status).toBe(200);
    const deleteLogRes = await request.delete(`/api/log/${createLogRes.body}`);
    expect(deleteLogRes.status).toBe(204);

    const deleteCharacterRes = await request.delete(`/api/character/${createCharacterRes.body}`);
    expect(deleteCharacterRes.status).toBe(204);

    const wrongPwdEditRes = await request.put('/api/auth/password').send({
      username: 'alex',
      oldPassword: 'Abcd124!',
      newPassword: 'Abcd125!'
    });
    expect(wrongPwdEditRes.status).toBe(401);
    expect(wrongPwdEditRes.body.error).toBe('password does not match');
    const editRes = await request.put('/api/auth/password').send({
      username: 'alex',
      oldPassword: 'Abcd123!',
      newPassword: 'Abcd124!'
    });
    expect(editRes.status).toBe(200);

    const wrongPwdDeleteRes = await request.delete('/api/auth/delete').send({
      username: 'alex',
      userId: loginRes.body.userId,
      password: 'Abcd123!'
    });
    expect(wrongPwdDeleteRes.status).toBe(401);
    expect(wrongPwdDeleteRes.body.error).toBe('password does not match');
    const deleteUserRes = await request.delete('/api/auth/delete').send({
      username: 'alex',
      userId: loginRes.body.userId,
      password: 'Abcd124!'
    });
    expect(deleteUserRes.status).toBe(204);
    done();
  });
});
