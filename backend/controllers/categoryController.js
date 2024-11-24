const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const SubCategory = require("../models/subCategoryModel");

const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        success: false,
        message: "Fill the required fields",
      });
    }

    const addCategory = new Category({
      name,
      image,
    });

    const category = await addCategory.save();

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not created",
      });
    }

    res.status(201).json({
      success: true,
      message: "Category created",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    const update = await Category.updateOne(
      {
        _id: _id,
      },
      {
        name,
        image,
      }
    );

    res.status(200).json({
      success: true,
      message: "Category updated",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.body;

    const checkSubCategory = await SubCategory.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    const checkProduct = await Product.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        success: false,
        message: "Category is already in use so can't delete",
      });
    }

    const deleteCategory = await Category.deleteOne({ _id: _id });

    res.status(200).json({
      success: true,
      message: "Category deleted",
      data: deleteCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = { addCategory, getCategory, deleteCategory, updateCategory };
