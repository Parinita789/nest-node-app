import 'jest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../src/modules/user/user.module';
require('dotenv').config();

describe('User API Test', () => {
  let app: INestApplication;
  let userId;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST - /user', (done) => {
    request(app.getHttpServer())
      .post('/user')
      .send({
        "first_name": "Parinita",
        "last_name": "Kumari",
        "user_name": `Pari@6${Math.floor(Math.random() * 90000 + 10000)}`,
        "password": "Pari@789",
        "profile_picture_url": ""
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        userId = res.body.data.user_id;
        return done();
      })
  })

  it('GET - /user/:id', (done) => {
    request(app.getHttpServer())
      .get(`/user/${userId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  })

  it('PUT - /user/:id', (done) => {
    request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send({
        "first_name": `Suyi${Math.floor(Math.random() * 90 + 10)}`,
        "last_name": "Ku"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect([200, 404])
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  })

  it('DELETE - /user/:id', (done) => {
    request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      })
  })
});