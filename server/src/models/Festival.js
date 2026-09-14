const mongoose = require('mongoose');

const FestivalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  associatedTemples: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Temple'
  }],
  period: {
    type: String, // e.g., 'October - November', 'Chaitra month'
    required: true,
  },
  significance: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Festival', FestivalSchema);
