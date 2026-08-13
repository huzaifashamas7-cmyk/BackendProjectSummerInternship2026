const webhookQueue = require('../queues/webhookQueue');

async function triggerWebhookEvent(db, eventType, payload) {
  const [subscriptions] = await db.execute(
    'SELECT * FROM webhook_subscriptions WHERE event_type = ? AND active = TRUE',
    [eventType]
  );

  for (const sub of subscriptions) {
    await webhookQueue.add(
      'deliver',
      {
        url: sub.url,
        secret: sub.secret,
        payload: {
          event: eventType,
          data: payload,
          timestamp: new Date().toISOString()
        }
      },
      {
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 2000, // first retry after 2s, then 4s, 8s, 16s, 32s
        },
      }
    );
  }

  console.log(`Triggered ${subscriptions.length} webhook(s) for event: ${eventType}`);
}

module.exports = triggerWebhookEvent;