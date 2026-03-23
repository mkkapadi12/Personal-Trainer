const mongoose = require('mongoose');

const { Schema } = mongoose;

// Review Schema (for ratings)
const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true },
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String, // can store HTML
      required: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String, // gallery images
      },
    ],

    stock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    reviews: [reviewSchema],

    // Optional features (future ready)
    features: [
      {
        type: String,
      },
    ],

    // For variants like size/flavor
    variants: [
      {
        name: String, // e.g. "Chocolate"
        price: Number,
        stock: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const PRODUCT = mongoose.model('Product', productSchema);

module.exports = PRODUCT;
