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
      userName: 'alex'
    });
    expect(noEmailRes.status).toBe(400);
    expect(noEmailRes.body.error).toBe('missing email');
    const noPwdRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@gmail.com'
    });
    expect(noPwdRes.status).toBe(400);
    expect(noPwdRes.body.error).toBe('missing password');
    const invalidPasswordRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123'
    });
    expect(invalidPasswordRes.status).toBe(400);
    expect(invalidPasswordRes.body.error).toBe('password is not valid');
    const createUserRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(createUserRes.status).toBe(201);
    const duplicateUserRes = await request.post('/api/auth/signup').send({
      userName: 'alex',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(duplicateUserRes.status).toBe(400);
    expect(duplicateUserRes.body.error).toBe('user name alex already exists');
    const duplicateEmailRes = await request.post('/api/auth/signup').send({
      userName: 'alex6',
      email: 'alex@gmail.com',
      password: 'Abcd123!'
    });
    expect(duplicateEmailRes.status).toBe(400);
    expect(duplicateEmailRes.body.error).toBe('email alex@gmail.com already exists');

    const wrongPwdLoginRes = await request.post('/api/auth/login').send({
      userName: 'alex',
      password: 'Abcd124!'
    });
    expect(wrongPwdLoginRes.status).toBe(401);
    expect(wrongPwdLoginRes.body.error).toBe('password does not match');
    const loginRes = await request.post('/api/auth/login').send({
      userName: 'alex',
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
      asset_1: 'asset 1',
      asset_2: 'asset 2',
      asset_3: 'asset 3',
      location: 'location a',
      bond_1: 'bond 1',
      bond_2: 'bond 2',
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
    expect(editCharacterEdgeRes.body.stat).toBe(6);
    const editCharacterHeartRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_heart: 7
    });
    expect(editCharacterHeartRes.status).toBe(200);
    expect(editCharacterHeartRes.body.stat).toBe(7);
    const editCharacterIronRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_iron: 8
    });
    expect(editCharacterIronRes.status).toBe(200);
    expect(editCharacterIronRes.body.stat).toBe(8);
    const editCharacterShadowRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_shadow: 9
    });
    expect(editCharacterShadowRes.status).toBe(200);
    expect(editCharacterShadowRes.body.stat).toBe(9);
    const editCharacterWitsRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      stat_wits: 10
    });
    expect(editCharacterWitsRes.status).toBe(200);
    expect(editCharacterWitsRes.body.stat).toBe(10);
    const addCharacterAssetRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      asset: 'asset 4'
    });
    expect(addCharacterAssetRes.status).toBe(201);
    expect(addCharacterAssetRes.body.asset[3]).toBe('asset 4');
    const deleteCharacterAssetRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      asset: 'asset 1'
    });
    expect(deleteCharacterAssetRes.status).toBe(204);
    const addCharacterEquipmentRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      equipment: 'equipment 1'
    });
    expect(addCharacterEquipmentRes.status).toBe(201);
    expect(addCharacterEquipmentRes.body.equipment[0]).toBe('equipment 1');
    const deleteCharacterEquipmentRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      equipment: 'equipment 1'
    });
    expect(deleteCharacterEquipmentRes.status).toBe(204);
    const editCharacterLocationRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      location: 'location b'
    });
    expect(editCharacterLocationRes.status).toBe(200);
    expect(editCharacterLocationRes.body.location).toBe('location b');
    const addCharacterBondRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      bond: 'bond 3'
    });
    expect(addCharacterBondRes.status).toBe(201);
    expect(addCharacterBondRes.body.bond[2]).toBe('bond 3');
    const deleteCharacterBondRes = await request.put(`/api/character/${createCharacterRes.body}`).send({
      bond: 'bond 1'
    });
    expect(deleteCharacterBondRes.status).toBe(204);

    const deleteCharaccterRes = await request.delete(`/api/character/${loginRes.body.userId}/${createCharacterRes.body}`);
    expect(deleteCharaccterRes.status).toBe(204);

    const wrongPwdEditRes = await request.put('/api/auth/password').send({
      userName: 'alex',
      oldPassword: 'Abcd124!',
      newPassword: 'Abcd125!'
    });
    expect(wrongPwdEditRes.status).toBe(401);
    expect(wrongPwdEditRes.body.error).toBe('password does not match');
    const editRes = await request.put('/api/auth/password').send({
      userName: 'alex',
      oldPassword: 'Abcd123!',
      newPassword: 'Abcd124!'
    });
    expect(editRes.status).toBe(200);

    const wrongPwdDeleteRes = await request.delete('/api/auth/delete').send({
      userName: 'alex',
      userId: loginRes.body.userId,
      password: 'Abcd123!'
    });
    expect(wrongPwdDeleteRes.status).toBe(401);
    expect(wrongPwdDeleteRes.body.error).toBe('password does not match');
    const deleteUserRes = await request.delete('/api/auth/delete').send({
      userName: 'alex',
      userId: loginRes.body.userId,
      password: 'Abcd124!'
    });
    expect(deleteUserRes.status).toBe(204);
    done();
  });
});
