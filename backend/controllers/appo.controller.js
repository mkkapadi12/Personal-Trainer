const APPOINTMENT = require('../models/appo.model');

//add appointment for only user
const addAppointment = async (req, res, next) => {
  try {
    const {
      service,
      duration,
      note,
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
      message,
    } = req.body;
    const appointment = await APPOINTMENT.create({
      service,
      duration,
      note,
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
      message,
      user: req.userId,
    });

    return res
      .status(201)
      .json({ msg: 'Appointment created successfully', appointment });
  } catch (error) {
    return next(error);
  }
};

//get all appointment for only user
const getAllAppointment = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userAppointment = await APPOINTMENT.find({ user: userId });

    if (!userAppointment) {
      return res.status(200).json({ msg: 'No appointments found' });
    }
    return res.status(200).json({ userAppointment });
  } catch (error) {
    next(error);
  }
};

//get all appointment for only admin
const getAllAppointmentAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, search, service, sort } = req.query;
    let query = {};

    if (service && service !== 'all') {
      query.service = service;
    }

    if (search && search !== 'all') {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    let sortOptions = {};

    if (sort === 'latest') sortOptions.createdAt = -1;
    else if (sort === 'oldest') sortOptions.createdAt = 1;
    else if (sort === 'booked') query.status = 'booked';
    else if (sort === 'confirmed') query.status = 'confirmed';
    else if (sort === 'completed') query.status = 'completed';
    else if (sort === 'cancelled') query.status = 'cancelled';

    const skip = (page - 1) * limit;

    const adminAppointment = await APPOINTMENT.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await APPOINTMENT.countDocuments(query);

    return res.status(200).json({
      msg: 'Appointments fetched successfully',
      totalAppointments: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      adminAppointment,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { addAppointment, getAllAppointment, getAllAppointmentAdmin };
