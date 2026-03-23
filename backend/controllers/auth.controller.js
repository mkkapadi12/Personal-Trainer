const USER = require('../models/user.model');

const registerUser = async (req, res, next) => {
  try {
    const user = req.body;

    const newUser = await USER.create(user);

    return res.status(201).json({
      msg: 'Registration successfully!',
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Login successful!',
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      msg: 'Profile retrieved successfully!',
      user,
    });
  } catch (error) {
    return next(error);
  }
};

//update profile
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const updatedUser = await USER.findByIdAndUpdate(
      userId,
      { $set: updates },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    );

    return res.status(200).json({
      msg: 'Profile updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerUser, loginUser, profile, updateProfile };
