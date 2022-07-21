import supertest from 'supertest';
import app from '../src/app.js';

describe('login test', () => {
  it('aadsas', async () => {
    const resute = await supertest(app).get('/');
    expect(resute.status).toEqual(200);
  });
});
