const ORDER = require('../models/order.model');
const PRODUCT = require('../models/product.model');

//create order for user
const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, status, addressId, shippingCharge, subtotal } =
      req.body;

    const productIds = items.map((item) => item.productId);
    const userId = req.userId;

    const validatedItems = [];

    for (const item of items) {
      const product = await PRODUCT.findById(item.productId);
      if (!product) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        return next(error);
      }
      validatedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const existOrder = await ORDER.find({
      userId,
      status: { $nin: ['delivered', 'cancelled'] },
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

    // Update product stock
    for (const item of validatedItems) {
      await PRODUCT.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = await ORDER.create({
      userId,
      items,
      totalAmount,
      status,
      addressId,
      subtotal,
      shippingCharge,
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

    pipeline.push({
      $lookup: {
        from: 'addresses',
        let: { addressId: '$addressId' },
        pipeline: [
          { $unwind: '$addresses' },
          { $match: { $expr: { $eq: ['$addresses._id', '$$addressId'] } } },
          { $replaceRoot: { newRoot: '$addresses' } },
        ],
        as: 'address',
      },
    });

    // flatten array → single object
    pipeline.push({
      $unwind: { path: '$address', preserveNullAndEmptyArrays: true },
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

    if (
      ![
        'pending',
        'shipped',
        'out_for_delivery',
        'delivered',
        'cancelled',
      ].includes(status)
    ) {
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
