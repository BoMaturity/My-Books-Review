const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/users.json');

// Đọc user từ file
function getUsersData() {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
}

// Ghi user vào file
function saveUsersData(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// ✅ Task 6: Register new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = getUsersData();

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (users[username]) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  users[username] = { password };
  saveUsersData(users);

  res.json({ message: 'User registered successfully' });
});

// ✅ Task 7: Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = getUsersData();

  if (users[username] && users[username].password === password) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
