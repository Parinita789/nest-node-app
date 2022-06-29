import 'jest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { LessonModule } from '../src/modules/lesson/lesson.module';
require('dotenv').config();

describe('Lesson API Test', () => {
  let app: INestApplication;
  let lessonId;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LessonModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST - /lesson', (done) => {
    request(app.getHttpServer())
      .post('/lesson')
      .send({
        "language_id": 1,
        "name": "Lesson 1",
        "lesson_text": "Learn Beginer to Advanced Level English."
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        lessonId = res.body.data.lesson_id;
        return done();
    })
  })

  it('GET - /lesson', (done) => {
    request(app.getHttpServer())
      .get(`/lesson`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
    })
  })

  it('PUT - /lesson/:id', (done) => {
    request(app.getHttpServer())
      .put(`/lesson/${lessonId}`)
      .send({
        "name": "Gettng Started...",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect([200, 404])
      .end((err, res) => {
        if (err) return done(err);
        return done();
    })
  })

  it('DELETE - /lesson/:id', (done) => {
    request(app.getHttpServer())
      .delete(`/lesson/${lessonId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
    })
  })
});