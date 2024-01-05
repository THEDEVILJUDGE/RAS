const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
