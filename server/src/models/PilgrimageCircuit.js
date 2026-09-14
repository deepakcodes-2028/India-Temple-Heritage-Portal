const mongoose = require('mongoose');

const PilgrimageCircuitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  temples: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple'
  }],
  suggestedOrder: [String], // Array of temple IDs or names indicating the flow
}, {
  timestamps: true,
});

module.exports = mongoose.model('PilgrimageCircuit', PilgrimageCircuitSchema);
