const ADMIN = require('../models/admin.model');
const USER = require('../models/user.model');

const registerAdmin = async (req, res, next) => {
  try {
    const admin = req.body;

    const newAdmin = await ADMIN.create(admin);

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

const updateAdminProfile = async (req, res, next) => {
  try {
    const admin = req.admin;
    const { name, phone } = req.body;
    admin.name = name;
    admin.phone = phone;
    await admin.save();
    return res.status(200).json({
      msg: 'Admin profile updated successfully!',
      admin,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, search = '', sort = 'createdAt' } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOption = {};

    if (sort === 'createdAt') sortOption.createdAt = -1;
    else if (sort === 'updatedAt') sortOption.updatedAt = -1;

    const skip = (page - 1) * limit;

    const users = await USER.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalUsers = await USER.countDocuments(query);
    return res.status(200).json({
      msg: 'Users fetched successfully!',
      totalUsers,
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
};
