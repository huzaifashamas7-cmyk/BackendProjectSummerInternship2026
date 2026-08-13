const { Worker } = require('bullmq');
const axios = require('axios');
const crypto = require('crypto');
const connection = require('../utils/queueConnection');

const webhookWorker = new Worker(
  'webhookDelivery',
  async (job) => {
    const { url, payload, secret } = job.data;

    const payloadString = JSON.stringify(payload);
    const signature = crypto
      .createHmac('sha256', secret)
      .update(payloadString)
      .digest('hex');

    const response = await axios.post(url, payload, {
      timeout: 10000,
      headers: {
        'X-Signature': signature,
      },
    });

    return { status: response.status };
  },
  { connection }
);

webhookWorker.on('completed', (job) => {
  console.log(`Webhook job ${job.id} delivered successfully`);
});

webhookWorker.on('failed', (job, err) => {
  console.error(`Webhook job ${job.id} failed (attempt ${job.attemptsMade}/${job.opts.attempts}):`, err.message);
});

module.exports = webhookWorker;