import 'jest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { LanguageModule } from '../src/modules/language/language.module';
require('dotenv').config();

describe('Language API Test', () => {
  let app: INestApplication;
  let languageId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LanguageModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST - /language', (done) => {
    request(app.getHttpServer())
      .post('/language')
      .send({
        "code": "EU",
        "name": "English",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        languageId = res.body.data.language_id;
        return done();
    })
  })

  it('GET - /language', (done) => {
    request(app.getHttpServer())
      .get(`/language`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
    })
  })

  it('PUT - /language/:id', (done) => {
    request(app.getHttpServer())
      .put(`/language/${languageId}`)
      .send({
        "name": "english",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect([200, 404])
      .end((err, res) => {
        if (err) return done(err);
        return done();
    })
  })

  it('DELETE - /language/:id', (done) => {
    request(app.getHttpServer())
      .delete(`/language/${languageId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect([200, 404])
      .end((err, res) => {
        if (err) return done(err);
        return done();
    })
  })

  it('DELETE - /language', (done) => {
    request(app.getHttpServer())
      .delete('/language')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
    })
  })
});