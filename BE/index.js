// server.js
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// // Middleware
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins (for testing purposes)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

// Routes
app.use('/users', usersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
