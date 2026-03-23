const APPOINTMENT = require('../models/appo.model');

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

module.exports = { addAppointment, getAllAppointment };
