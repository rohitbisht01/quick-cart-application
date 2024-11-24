import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { uploadImage } from "../utils/util";
import toast from "react-hot-toast";
import network from "../utils/network";
import allApis from "../config";

const UploadCategoryModel = ({ onClose, fetchCategoryData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setIsLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setIsLoading(false);

    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await network({
        ...allApis.addCategory,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
        fetchCategoryData();
      }
    } catch (error) {
      toast.error("Error adding category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-lg">Category</h1>
          <button onClick={onClose} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>

        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category"
              className="border outline-none rounded-md p-2 text-sm"
              value={data.name}
              name="name"
              onChange={handleOnChange}
            />
          </div>

          <div className="grid gap-1">
            <p className="font-semibold">Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
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
                    !data.name ? "bg-gray-300" : "border"
                  }  px-4 py-2 rounded cursor-pointer border font-medium text-sm`}
                >
                  {isLoading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  type="file"
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button
            className={`${
              data.name && data.image
                ? "bg-green-600 text-white"
                : "bg-gray-300"
            } py-2 font-semibold`}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
