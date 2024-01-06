const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./userModel');

router.post('/register', async (req, res) => {
  // Регистрация пользователя, как указано в предыдущем ответе
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ sub: req.user._id }, 'your-secret-key', { expiresIn: '1h' });
  res.json({ token });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});
// Получение информации о текущем пользователе
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Пользователь не аутентифицирован' });
  }
});

// Выход из системы
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Выход из системы успешен' });
});

module.exports = router;
