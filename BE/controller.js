// controllers/usersController.js
const usersData = require('./users.json');

// Get all users
const getAllUsers = () => {
  return usersData;
};

// Get user by name
const getUserByName = (name) => {
  return usersData.find(user => user.name === name);
};

module.exports = {
  getAllUsers,
  getUserByName
};
