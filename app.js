// Load environment variables
require('dotenv').config();

// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Set port and verify_token from environment variables
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests (Webhook verification)
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✓ WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    console.log('✗ Webhook verification failed');
    res.status(403).end();
  }
});

// Route for POST requests (Receive webhook data)
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n📨 Webhook received ${timestamp}`);
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(JSON.stringify(req.body, null, 2));
  } else {
    console.log('(Empty body)');
  }
  console.log('');
  
  res.status(200).end();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`\n🚀 Server listening on port ${port}`);
  console.log(`📍 Webhook URL: http://localhost:${port}/`);
  console.log(`🔐 Verify Token: ${verifyToken || 'NOT SET'}\n`);
});
