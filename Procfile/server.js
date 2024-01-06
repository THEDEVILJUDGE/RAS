const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 27017;

// Прямое подключение к базе данных (замените "ваша_база_данных" на имя вашей базы данных)
mongoose.connect('mongodb://localhost:27017/r', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());

// Используем маршруты для событий
const eventRoutes = require('./eventRoutes');
app.use('/api', eventRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
