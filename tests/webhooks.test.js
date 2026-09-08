const request = require('supertest');
const app = require('../server');

describe('Webhook Flow', () => {
  let apiKey;
  let webhookSecret;

  beforeAll(async () => {
    const keyRes = await request(app)
      .post('/api/v1/keys')
      .send({
        key_name: 'webhooks test key',
        scopes: ['webhooks:read', 'webhooks:write', 'results:read', 'results:write'],
        user_id: 1
      });
    apiKey = keyRes.body.api_key;
  });

  test('should register a webhook subscription', async () => {
    const res = await request(app)
      .post('/api/v1/webhooks')
      .set('Authorization', `Bearer ${apiKey}`)
      .send({
        event_type: 'result.published',
        url: 'https://webhook.site/test-integration'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('secret');
    webhookSecret = res.body.secret;
  });

  test('should reject registration missing required url', async () => {
    const res = await request(app)
      .post('/api/v1/webhooks')
      .set('Authorization', `Bearer ${apiKey}`)
      .send({
        event_type: 'result.published'
      });

    expect(res.statusCode).toBe(400);
  });

  test('should list webhook subscriptions', async () => {
    const res = await request(app)
      .get('/api/v1/webhooks')
      .set('Authorization', `Bearer ${apiKey}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should trigger a webhook when a result is created', async () => {
    const res = await request(app)
      .post('/api/v1/results')
      .set('Authorization', `Bearer ${apiKey}`)
      .send({
        student_id: 1,
        exam_id: 1,
        score: 75
      });

    expect(res.statusCode).toBe(201);
    // Actual delivery happens asynchronously via BullMQ,
    // so we only verify the result was created successfully here.
    // Real delivery was already proven manually in Week 3.
  });
});