const ORDER = require('../models/order.model');

//create order for user
const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, status, addressId } = req.body;

    const productIds = items.map((item) => item.productId);
    const userId = req.userId;

    const existOrder = await ORDER.find({
      userId,
      status: { $nin: ['completed', 'cancelled'] },
      'items.productId': { $in: productIds },
    }).populate('items.productId');

    if (existOrder.length > 0) {
      const productNames = existOrder
        .flatMap((order) =>
          order.items.map((item) => item.productId?.name || ''),
        )
        .join(', ');

      const error = new Error(`Order already exists for: ${productNames}`);
      error.statusCode = 400;
      return next(error);
    }

    const order = await ORDER.create({
      userId,
      items,
      totalAmount,
      status,
      addressId,
    });

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(error);
  }
};

// get all orders for admin
const getAllOrders = async (req, res, next) => {
  try {
    const { status, search, sort = 'latest', page = 1, limit = 5 } = req.query;

    const pipeline = [];

    // status filter
    if (status && status !== 'all') {
      pipeline.push({
        $match: { status },
      });
    }

    // lookup users
    pipeline.push({
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    });

    pipeline.push({
      $unwind: '$user',
    });

    // lookup products
    pipeline.push({
      $lookup: {
        from: 'products',
        localField: 'items.productId',
        foreignField: '_id',
        as: 'products',
      },
    });

    // search
    if (search && search !== 'all') {
      pipeline.push({
        $match: {
          $or: [
            { 'products.name': { $regex: search, $options: 'i' } },
            { 'user.firstName': { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    // sorting
    let sortOption = {};

    if (sort === 'latest') sortOption = { createdAt: -1 };
    else if (sort === 'oldest') sortOption = { createdAt: 1 };

    pipeline.push({ $sort: sortOption });

    // pagination
    const skip = (Number(page) - 1) * Number(limit);

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: Number(limit) });

    const orders = await ORDER.aggregate(pipeline);

    // count pipeline (for total)
    const countPipeline = [...pipeline];
    countPipeline.splice(-3); // remove sort, skip, limit
    countPipeline.push({ $count: 'total' });

    const totalResult = await ORDER.aggregate(countPipeline);
    const totalOrders = totalResult[0]?.total || 0;

    return res.status(200).json({
      success: true,
      totalOrders,
      currentPage: Number(page),
      totalPages: Math.ceil(totalOrders / limit),
      orders,
    });
  } catch (error) {
    next(error);
  }
};

//get order by user id
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.userId;
    const order = await ORDER.find({ userId }).populate('items.productId');

    if (order.length === 0) {
      const error = new Error('No orders found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return next(error);
  }
};

// update order status (admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      const error = new Error('Invalid status value');
      error.statusCode = 400;
      return next(error);
    }

    const order = await ORDER.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
};
