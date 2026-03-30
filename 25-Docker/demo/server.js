const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Docker!',
    environment: NODE_ENV,
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// A simple data route to make the app feel real
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice', role: 'engineer' },
    { id: 2, name: 'Bob', role: 'designer' },
    { id: 3, name: 'Carol', role: 'product' }
  ]);
});

app.listen(PORT, () => {
  console.log(`-----------------------------------------`);
  console.log(`  App running on http://localhost:${PORT}`);
  console.log(`  Environment: ${NODE_ENV}`);
  console.log(`-----------------------------------------`);
});
