const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);