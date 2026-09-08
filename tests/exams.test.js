const request = require('supertest');
const app = require('../server');

describe('Exams Resource', () => {
  let apiKey;
  let createdExamId;

  beforeAll(async () => {
    const keyRes = await request(app)
      .post('/api/v1/keys')
      .send({
        key_name: 'exams test key',
        scopes: ['exams:read', 'exams:write'],
        user_id: 1
      });
    apiKey = keyRes.body.api_key;
  });

  test('should create a new exam', async () => {
    const res = await request(app)
      .post('/api/v1/exams')
      .set('Authorization', `Bearer ${apiKey}`)
      .send({
        title: 'Integration Test Exam',
        description: 'Created by automated test',
        duration_minutes: 45
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdExamId = res.body.id;
  });

  test('should list exams including the new one', async () => {
    const res = await request(app)
      .get('/api/v1/exams')
      .set('Authorization', `Bearer ${apiKey}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.some(exam => exam.id === createdExamId);
    expect(found).toBe(true);
  });

  test('should get the exam by id', async () => {
    const res = await request(app)
      .get(`/api/v1/exams/${createdExamId}`)
      .set('Authorization', `Bearer ${apiKey}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Integration Test Exam');
  });

  test('should update the exam', async () => {
    const res = await request(app)
      .put(`/api/v1/exams/${createdExamId}`)
      .set('Authorization', `Bearer ${apiKey}`)
      .send({
        title: 'Updated Exam Title',
        description: 'Updated description',
        duration_minutes: 90
      });

    expect(res.statusCode).toBe(200);
  });

  test('should reject creating an exam without required title', async () => {
    const res = await request(app)
      .post('/api/v1/exams')
      .set('Authorization', `Bearer ${apiKey}`)
      .send({
        description: 'missing title and duration'
      });

    expect(res.statusCode).toBe(400);
  });
});