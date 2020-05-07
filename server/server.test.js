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

  it('account', async done => {
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
      password: 'Abcd123!'
    });
    expect(wrongPwdDeleteRes.status).toBe(401);
    expect(wrongPwdDeleteRes.body.error).toBe('password does not match');
    const deleteUserRes = await request.delete('/api/auth/delete').send({
      userName: 'alex',
      password: 'Abcd124!'
    });
    expect(deleteUserRes.status).toBe(204);
    done();
  });
});
