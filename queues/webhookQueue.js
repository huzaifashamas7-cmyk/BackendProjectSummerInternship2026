const { Queue } = require('bullmq');
const connection = require('../utils/queueConnection');

const webhookQueue = new Queue('webhookDelivery', { connection });

module.exports = webhookQueue;