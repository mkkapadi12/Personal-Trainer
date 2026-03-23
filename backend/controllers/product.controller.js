const PRODUCT = require('../models/product.model');

const addItem = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      description,
      mainImage,
      images,
      stock,
      features,
      variants,
    } = req.body;

    if (!name || !price || !category || !description || !mainImage) {
      const error = new Error('Please fill all required fields');
      error.status = 400;
      return next(error);
    }

    const existingProduct = await PRODUCT.findOne({ name });

    if (existingProduct) {
      const error = new Error('Product already exists');
      error.status = 409;
      return next(error);
    }

    const product = await PRODUCT.create({
      name,
      brand,
      category,
      price,
      description,
      mainImage,
      images,
      stock,
      features,
      variants,
    });

    return res.status(201).json({
      msg: 'Product created successfully',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Product fetched successfully',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // 🔍 Build Query
    let query = {};

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search (name + brand)
    if (search && search !== 'all') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🧠 Sorting
    let sortOption = {};

    if (sort === 'price-asc') sortOption.price = 1;
    else if (sort === 'price-desc') sortOption.price = -1;
    else if (sort === 'latest') sortOption.createdAt = -1;
    else if (sort === 'rating') sortOption.rating = -1;

    // 📄 Pagination
    const skip = (page - 1) * limit;

    // 🔥 Execute Query
    const products = await PRODUCT.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await PRODUCT.countDocuments(query);

    return res.status(200).json({
      msg: 'Products fetched successfully',
      totalProducts: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addItem, getProductById, getAllProducts };
