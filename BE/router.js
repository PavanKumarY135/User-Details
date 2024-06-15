const express = require('express');
const router = express.Router();
const { getAllUsers, getUserByName } = require('./controller');

// GET all users
router.get('/', (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

// GET user by name
router.get('/:name', (req, res) => {
  const userName = req.params.name;
  const user = getUserByName(userName);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
