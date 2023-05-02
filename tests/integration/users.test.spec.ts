import supertest from 'supertest';
import app from '../../src/app.js';
import { deleteFile, clearDB } from '../utils/index.js';

describe('auth test', () => {
  let token;
  let saveImgPath;
  const user = {
    name: 'userTest',
    email: 'test@gmail.com',
    password: '123',
  };

  it('create a user and receive 201', async () => {
    const response = await supertest(app)
      .post('/signUp')
      .field('name', user.name)
      .field('email', user.email)
      .field('password', user.password)
      .attach('image', 'uploads/testImage.png');

    expect(response.status).toEqual(201);
  });

  it("Login a user and receive a status 200 along with response properties 'token' and 'user''", async () => {
    const response = await supertest(app)
      .post('/login')
      .send({ email: user.email, password: user.password });

    saveImgPath = response.body.user.image;

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');

    token = response.body.token;
  });

  it('Refresh token and receive 200', async () => {
    const response = await supertest(app)
      .put('/user/refresh')
      .send({ oldToken: token });

    token = response.text;

    expect(response.status).toEqual(200);
  });

  it('Logout user and receive 200', async () => {
    const response = await supertest(app)
      .delete('/logout')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toEqual(200);
  });

  afterAll(async () => {
    await clearDB();
    deleteFile(saveImgPath);
  });
});
