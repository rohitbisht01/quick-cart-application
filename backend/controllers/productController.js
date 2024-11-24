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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductByCategory,
  deleteProduct,
};
