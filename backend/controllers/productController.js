const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;

    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter required fields",
      });
    }

    const product = new Product({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });

    const saveProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product created",
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const { page, limit, search } = req.body;

    if (!page) {
      page = 1;
    }

    if (!limit) {
      limit = 10;
    }

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      Product.find(query)
        .sort({
          createAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Product data",
      totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (id) {
      return res.status(400).json({
        success: false,
        message: "Provide category id",
      });
    }

    const product = await Product.find({
      category: { $in: id },
    }).limit(10);

    res.status(200).json({
      success: true,
      data: product,
      message: "Products by category",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Provide product id",
      });
    }

    const existingProduct = await Product.findById(_id);
    if (!existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(_id);
    res.status(200).json({
      success: false,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Provide product id",
      });
    }

    const existingProduct = await Product.findById(_id);
    if (!existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(_id, {
      ...req.body,
    });
    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { search, page, limit } = req.body;

    if (!page) page = 1;
    if (!limit) limit = 10;

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;
    const [data, dataCount] = await Promise.all([
      Product.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Product data",
      success: true,
      data: data,
      totalCount: dataCount,
      totalPage: Math.ceil(dataCount / limit),
      page: page,
      limit: limit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product Id not found",
      });
    }

    const product = await Product.findById(productId);

    res.status(200).json({
      success: true,
      message: "Product detail",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getProductByCategoryAndSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId, page, limit } = req.body;

    if (!categoryId || !subcategoryId) {
      return res.status(400).json({
        success: false,
        message: "Provide categoryId nad subcategoryId",
      });
    }

    if (!page) page = 1;
    if (!limit) limit = 10;

    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subcategoryId },
    };

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Product list",
      data: data,
      totalCount: dataCount,
      page: page,
      limit: limit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = {
  updateProductDetails,
  createProduct,
  getProducts,
  getProductByCategory,
  deleteProduct,
  searchProduct,
  getProductDetails,
  getProductByCategoryAndSubcategory,
};
