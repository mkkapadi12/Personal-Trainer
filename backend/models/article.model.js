const mongoose = require('mongoose');

const { Schema } = mongoose;

/* ---------------- COMMENT SCHEMA ---------------- */

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/* ---------------- ARTICLE SCHEMA ---------------- */

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    featuredImage: {
      type: String,
    },

    description: {
      type: String, // HTML content stored here
      required: true,
    },

    comments: [commentSchema],
  },
  {
    timestamps: true,
  },
);

const ARTICLE = mongoose.model('Article', articleSchema);

module.exports = ARTICLE;
