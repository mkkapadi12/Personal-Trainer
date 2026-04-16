const ORDER = require('../models/order.model');
const USER = require('../models/user.model');
const APPOINTMENT = require('../models/appo.model');

const getRecentActivity = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Recent orders (purchases)
    const recentOrders = await ORDER.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId')
      .populate('items.productId');

    // Recent signups
    const recentUsers = await USER.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('firstName lastName createdAt');

    //Booked appointments
    const bookedAppointments = await APPOINTMENT.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user');

    // Normalize orders into activity items
    const orderActivities = recentOrders.map((order) => ({
      id: order._id,
      type: 'ordered',
      userName:
        order.userId?.firstName + ' ' + order.userId?.lastName || 'Unknown',
      detail: order.items?.[0]?.productId?.name || 'a product',
      createdAt: order.createdAt,
    }));

    // Normalize signups into activity items
    const userActivities = recentUsers.map((user) => ({
      id: user._id,
      type: 'signed up',
      userName: user.firstName + ' ' + user.lastName,
      detail: 'New account',
      createdAt: user.createdAt,
    }));

    // Normalize booked appointments into activity items
    const appointmentActivities = bookedAppointments.map((appointment) => ({
      id: appointment._id,
      type: 'booked',
      userName: appointment.user?.firstName + ' ' + appointment.user?.lastName,
      detail: 'an appointment',
      createdAt: appointment.createdAt,
    }));

    // Merge + sort by newest first
    const combined = [
      ...orderActivities,
      ...userActivities,
      ...appointmentActivities,
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);

    return res
      .status(200)
      .json({ msg: 'Recent activity fetched', data: combined });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getRecentActivity };
