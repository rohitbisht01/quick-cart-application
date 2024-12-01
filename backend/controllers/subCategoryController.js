const SubCategory = require("../models/subCategoryModel");

const createSubCategory = async (req, res) => {
  try {
    const { image, name, category } = req.body;

    if (!name || !image || !category[0]) {
      return res.status(400).json({
        success: false,
        message: "Provide name, image and category name",
      });
    }

    const newSubCategory = new SubCategory({ name, image, category });
    await newSubCategory.save();

    res.status(201).json({
      success: true,
      message: "Subcategory successfully created",
      data: newSubCategory,
    });
  } catch (error) {
    console.log("Error creating subcategory", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const getSubcategory = async (req, res) => {
  try {
    const subCategoryData = await SubCategory.find()
      .sort({ createdAt: -1 })
      .populate("category");

    res.status(200).json({
      success: true,
      data: subCategoryData,
    });
  } catch (error) {
    console.log("Error getting subcategory", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const updateSubcategory = async (req, res) => {
  try {
    const { _id, name, category, image } = req.body;

    const subCategoryExists = await SubCategory.findById({ _id });

    if (!subCategoryExists) {
      return res.status(400).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    const updatedSubCategoryData = await SubCategory.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    res.status(200).json({
      success: true,
      message: "Subcategory Updated successfully",
      data: updatedSubCategoryData,
    });
  } catch (error) {
    console.log("Error updating subcategory", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const { _id } = req.body;

    const subCategoryExits = await SubCategory.findById(_id);
    if (!subCategoryExits) {
      return res.status(400).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    await SubCategory.findByIdAndDelete(_id);

    res.status(200).json({
      success: true,
      message: "Subcategory deleted",
    });
  } catch (error) {
    console.log("Error deleting subcategory", error);
    res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

module.exports = {
  createSubCategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
