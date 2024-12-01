import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import network from "../utils/network";
import allApis from "../config";
import { uploadImage } from "../utils/util";

const EditSubcategory = ({ data, onClose, fetchSubCategoryData }) => {
  const [subcategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category,
  });
  const [isLoading, setIsLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setIsLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setIsLoading(false);

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveSubcategory = (categoryId) => {
    const index = subcategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subcategoryData.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await network({
        ...allApis.updateSubCategory,
        data: subcategoryData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        if (onClose) onClose();
        if (fetchSubCategoryData) fetchSubCategoryData();
      }
    } catch (error) {
      console.log("Error updating subcategory", error);
      toast.error("Error updating subcategory");
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-lg">Update Sub Category</h1>
          <button className="w-fit block ml-auto" onClick={onClose}>
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-2" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label id="subcategoryName" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter subcategory name"
              onChange={handleOnChange}
              className="border outline-none p-2 rounded-md text-sm"
              value={subcategoryData.name}
              name="name"
            />
          </div>

          <div className="grid gap-1">
            <p className="font-semibold">Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {subcategoryData.image ? (
                  <img
                    src={subcategoryData.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm">No Image</p>
                )}
              </div>

              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    !subcategoryData.name ? "bg-gray-300" : "border"
                  }  px-4 py-2 rounded cursor-pointer border font-medium text-sm`}
                >
                  {isLoading ? "Loading" : "Upload Image"}
                </div>
                <input
                  type="file"
                  disabled={!subcategoryData.name}
                  onChange={handleUploadSubCategoryImage}
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="font-semibold">Select Category</label>
            <div className="border rounded">
              {subcategoryData.category.map((cat) => {
                return (
                  <p
                    key={`${cat._id}selectedValue`}
                    className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                  >
                    {cat.name}
                    <div
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveSubcategory(cat._id)}
                    >
                      <IoClose size={20} />
                    </div>
                  </p>
                );
              })}
            </div>

            <select
              name=""
              id=""
              className="text-sm p-2 w-full focus:outline-none"
              onChange={(e) => {
                const value = e.target.value;
                const categoryDetails = allCategory.find(
                  (el) => el._id === value
                );

                setSubCategoryData((prev) => {
                  return {
                    ...prev,
                    category: [...prev.category, categoryDetails],
                  };
                });
              }}
            >
              <option value={""}>Select Category</option>
              {allCategory.map((category, index) => {
                return (
                  <option
                    value={category?._id}
                    key={category?._id + "subcategory"}
                  >
                    {category?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            className={`px-4 py-2 border
                            ${
                              subcategoryData?.name &&
                              subcategoryData?.image &&
                              subcategoryData?.category[0]
                                ? ""
                                : "bg-gray-200"
                            }    
                            font-semibold
                        `}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubcategory;
