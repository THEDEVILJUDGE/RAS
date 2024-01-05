const express = require('express');
const router = express.Router();
const Event = require('./eventModel');

// Получение списка событий
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создание нового события
router.post('/events', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    organizer: req.body.organizer
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
