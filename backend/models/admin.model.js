const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    phone: {
      type: String,
      unique: [true, 'Phone number already exists'],
    },
  },
  {
    timestamps: true,
  },
);

// Secure the password with bcrypt
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const saltRound = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRound);
});

// Generate JWT token
adminSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        adminId: this._id.toString(),
        email: this.email,
        name:this.name,
        phone:this.phone,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '24h',
      },
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

// Compare password
adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Check if admin has specific permission
adminSchema.methods.hasPermission = function (permission) {
  return this.permissions.includes(permission);
};

const ADMIN = mongoose.model('Admin', adminSchema);
module.exports = ADMIN;
