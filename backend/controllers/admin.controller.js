const ADMIN = require('../models/admin.model');

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const newAdmin = await ADMIN.create({ name, email, password, phone });

    return res.status(201).json({
      msg: 'Admin registration successful!',
      token: await newAdmin.generateToken(),
      adminId: newAdmin._id.toString(),
    });
  } catch (error) {
    return next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await ADMIN.findOne({ email });

    if (!admin) {
      const error = new Error('Admin not found');
      error.statusCode = 404;
      return next(error);
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Admin login successful!',
      token: await admin.generateToken(),
      adminId: admin._id.toString(),
    });
  } catch (error) {
    return next(error);
  }
};

const getAdminProfile = async (req, res, next) => {
  try {
    const admin = req.admin;
    return res.status(200).json({
      msg: 'Admin profile fetched successfully!',
      admin,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
};
