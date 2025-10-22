import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import { getCache, setCache } from "../config/redis.js";
const featuredCacheKey = "featured:products";

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category, search, minPrice, maxPrice, sort } = req.query;

  let query = {};
  if (category) query.category = category;
  if (search) query.search = { $regex: search.toString() };

  if (minPrice || maxPrice) {
    query.price = {
      ...(minPrice && { $gte: Number(minPrice) }),
      ...(maxPrice && { $lte: Number(maxPrice) }),
    };
  }

  // If sort option is provided and is equal to "sort by acending", the products will be returned in that order, else returned by latest or recently added
  const sortOption = sort
    ? { price: sort === "asc" ? 1 : -1 }
    : { createdAt: -1 };

  const cacheKey = `products:${JSON.stringify(req.query)}`;

  // Try to get or set cached products
  // const cachedProducts = await getCache(cacheKey);

  // if (cachedProducts) {
  //   res.status(200).json({
  //     source: "cache",
  //     success: true,
  //     count: cachedProducts.length,
  //     data: cachedProducts,
  //   });
  // } else {
  const products = await Product.find(query).sort(sortOption).lean();

  console.log(query);
  console.log(products);

  await setCache(cacheKey, products);

  res.status(200).json({
    source: "dataset",
    success: true,
    count: products.length,
    data: products,
  });
  // }
});

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { featured } = req.query;

  if (featured) {
    // get from cache and filter from there first
    const cachedProducts = await getCache(featuredCacheKey);
    if (cachedProducts) {
      const featuredCachedProducts = cachedProducts.filter(
        (product) => (product.isFeatured = true)
      );

      res.status(200).json({
        source: "cache",
        success: true,
        featuredCount: featuredCachedProducts.length,
        data: featuredCachedProducts,
      });
    }

    // Return data from database otherwise
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await setCache(featuredCacheKey, featuredProducts);

    res.status(200).json({
      source: "dataset",
      success: true,
      featuredCount: featuredProducts.length,
      data: featuredProducts,
    });
  }
});

/**
 * @desc    Get a single product
 * @route   GET /api/products/:slug
 * @access  Public
 */
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const cacheKey = `products:${slug}`;

  // Try to get from cache
  const cachedProduct = await getCache(cacheKey);
  if (cachedProduct) {
    return res.status(200).json({
      source: "cache",
      success: true,
      data: cachedProduct,
    });
  }

  // Otherwise, get from DB
  const product = await Product.findOne({ slug: slug }).populate("createdBy");

  if (!product) {
    product = await Product.findOne({ title: slug }).populate("createdBy");
  }

  // Cache the product
  await setCache(cacheKey, product);

  res.status(200).json({
    source: "dataset",
    success: true,
    data: product,
  });
});

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, images, isFeatured } =
    req.body;

  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images,
    isFeatured,
  });

  const cacheKey = 'products';
  // Clear cached lists
  await clearCache(cacheKey);
  await clearCache(featuredCacheKey);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});


/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const cacheKey = `product:${id}`

  const product = await Product.findByIdAndUpdate(id, updates, { new: true });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Clear product + product list cache
  await clearCache(cacheKey);
  await clearCache("products");
  await clearCache(featuredCacheKey);

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cacheKey = `product:${id}`
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  // Clear relevant caches
  await clearCache(cacheKey);
  await clearCache("products");
  await clearCache(featuredCacheKey);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
