const request = require('supertest');
const app = require('../server');

describe('API Key Lifecycle', () => {
  let createdKeyId;
  let rawApiKey;

  test('should create a new API key', async () => {
    const res = await request(app)
      .post('/api/v1/keys')
      .send({
        key_name: 'integration test key',
        scopes: ['exams:read'],
        user_id: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('api_key');
    expect(res.body.api_key).toMatch(/^sk_/);

    rawApiKey = res.body.api_key;
  });

  test('should use the key to access a protected route', async () => {
    const res = await request(app)
      .get('/api/v1/exams')
      .set('Authorization', `Bearer ${rawApiKey}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should reject an invalid key', async () => {
    const res = await request(app)
      .get('/api/v1/exams')
      .set('Authorization', 'Bearer sk_invalidkey123');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Invalid or revoked/);
  });
});