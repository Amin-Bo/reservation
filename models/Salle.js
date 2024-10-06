const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  equipment: [String],
}, { timestamps: true });

module.exports = mongoose.model('Salle', salleSchema);