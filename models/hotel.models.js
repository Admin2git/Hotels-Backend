const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: [String],
      enum: ['Budget', 'Mid-Range', 'Luxury', 'Boutique', 'Resort', 'Other'],
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        type: String,
      },
    ],
    website: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    checkInTime: {
      type: String,
      required: true,
      trim: true,
    },
    checkOutTime: {
      type: String,
      required: true,
      trim: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    priceRange: {
      type: String,
      enum: ['$ (0-10)', '$$ (11-30)', '$$$ (31-60)', '$$$$ (61+)', 'Other'],
    },
    reservationsNeeded: {
      type: Boolean,
      default: false,
    },
    isParkingAvailable: {
      type: Boolean,
      default: false,
    },
    isWifiAvailable: {
      type: Boolean,
      default: false,
    },
    isPoolAvailable: {
      type: Boolean,
      default: false,
    },
    isSpaAvailable: {
      type: Boolean,
      default: false,
    },
    isRestaurantAvailable: {
      type: Boolean,
      default: false,
    },
    photos: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Hotel = mongoose.model('Hotel', HotelSchema);
module.exports = Hotel;
