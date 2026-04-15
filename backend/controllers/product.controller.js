const PRODUCT = require('../models/product.model');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const addItem = async (req, res, next) => {
  try {
    const {
      name,
      brand,
      category,
      price,
      description,
      stock,
      features,
      variants,
    } = req.body;

    if (!name || !price || !category || !description) {
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

    const Images = req.files || [];
    const uploadedImages = await Promise.all(
      Images.map(async (file, index) => {
        const result = await uploadToCloudinary(file.buffer).then((res) => {
          return {
            url: res.url,
            public_id: res.public_id,
            isPrimary: index === 0,
          };
        });
        return result;
      }),
    );

    if (uploadedImages.length === 0) {
      const error = new Error('Failed to upload images');
      error.status = 500;
      return next(error);
    }

    const product = await PRODUCT.create({
      name,
      brand,
      category,
      price,
      description,
      images: uploadedImages,
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
      sort = 'latest',
      page = 1,
      limit = 5,
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

    const skip = (page - 1) * limit;

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

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      brand,
      category,
      price,
      description,
      stock,
      features,
      variants,
    } = req.body;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }

    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock;
    product.features = features || product.features;
    product.variants = variants || product.variants;
    let finalImages = [];
    if (req.body.existingImages) {
      try {
        finalImages = JSON.parse(req.body.existingImages);
      } catch (e) {
        // ignore JSON parse error
      }
    } else if (product.images && req.body.existingImages === undefined && req.files && req.files.length === 0) {
      // If neither existingImages nor new files were sent, keep old images
      finalImages = product.images;
    }

    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await uploadToCloudinary(file.buffer);
          return {
            url: result.url,
            public_id: result.public_id,
          };
        }),
      );
    }

    if (req.body.existingImages !== undefined || uploadedImages.length > 0) {
      const allImages = [...finalImages, ...uploadedImages].slice(0, 4); // enforce max 4 images
      allImages.forEach((img, idx) => {
        img.isPrimary = idx === 0;
      });
      if (allImages.length > 0) {
        product.images = allImages;
      }
    }

    await product.save();

    return res.status(200).json({
      msg: 'Product updated successfully',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await PRODUCT.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.status = 404;
      return next(error);
    }

    await product.deleteOne();

    return res.status(200).json({
      msg: 'Product deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addItem,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
