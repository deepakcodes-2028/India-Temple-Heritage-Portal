const mongoose = require('mongoose');

const TempleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  history: {
    type: String,
  },
  deity: {
    type: String,
    required: true,
  },
  location: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  rituals: [
    {
      name: String,
      time: String,
      description: String,
    },
  ],
  darshanTimings: {
    morning: String,
    evening: String,
    specialTimings: String,
  },
  festivals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Festival'
  }],
  visitorGuidelines: {
    dressCode: String,
    photographyRules: String,
    footwearRules: String,
    generalBehavior: String,
  },
  nearbyFacilities: {
    accommodation: [String],
    transportation: [String],
    food: [String],
  },
  category: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  images: [String],
  verificationStatus: {
    type: String,
    enum: ['VERIFIED', 'PENDING', 'NEEDS_REVIEW'],
    default: 'PENDING',
  },
  published: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Middleware to automatically generate a slug from the name before saving
TempleSchema.pre('save', function(next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Temple', TempleSchema);
