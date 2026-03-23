const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
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
      unique: [true, 'Email already exists'],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    
    phone: {
      type: Number,
      minlength: [10, 'Phone number must be at least 10 digits'],
    },
  },

  { timestamps: true },
);

//Secure the password with bcrypt
userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//generate token
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      },
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

//compare password

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const USER = mongoose.model('User', userSchema);
module.exports = USER;
