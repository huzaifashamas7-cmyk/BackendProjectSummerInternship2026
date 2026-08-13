const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// This must match the secret of the subscription you create in Step 2 below
const SECRET = '8f51d03ac89030577b9b4fc35607e71a96889f50d4096eb985bc988d4706b4ed';

app.post('/receive', (req, res) => {
  const receivedSignature = req.headers['x-signature'];
  const payloadString = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', SECRET)
    .update(payloadString)
    .digest('hex');

  console.log('--- Webhook received ---');
  console.log('Payload:', req.body);
  console.log('Received signature: ', receivedSignature);
  console.log('Expected signature: ', expectedSignature);

  if (receivedSignature === expectedSignature) {
    console.log('✅ Signature VALID — this webhook is authentic');
  } else {
    console.log('❌ Signature INVALID — reject this webhook');
  }

  res.status(200).json({ received: true });
});

app.listen(4000, () => {
  console.log('Test webhook receiver listening on port 4000');
});