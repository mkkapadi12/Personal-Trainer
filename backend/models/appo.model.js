const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
    },

    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },

    note: {
      type: String,
      trim: true,
    },

    date: {
      type: String,
      required: [true, 'Date is required'],
    },

    time: {
      type: String,
      required: [true, 'Time is required'],
    },

    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      unique: [true, 'Email already exists'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: [true, 'Phone number already exists'],
      match: [/^[0-9]{10}$/, 'Phone number must be 10 digits'],
    },

    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const APPOINTMENT = mongoose.model('Appointment', appointmentSchema);

module.exports = APPOINTMENT;
