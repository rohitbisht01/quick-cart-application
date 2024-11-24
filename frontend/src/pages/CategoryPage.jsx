import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import toast from "react-hot-toast";
import network from "../utils/network";
import allApis from "../config";
import Loading from "../components/Loading";
import NoDataPage from "../components/NoDataPage";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await network({
        ...allApis.getCategory,
      });

      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching category");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await network({
        ...allApis.deleteCategory,
        data: deleteCategory,
      });

      if (response.data.success) {
        toast.success("Category deleted");
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between p-2 shadow-md">
        <h1 className="font-semibold">Category</h1>
        <button
          className="text-sm rounded-md border py-1 px-2"
          onClick={() => setOpenUploadCategory(true)}
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !isLoading && <NoDataPage />}

      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData &&
          categoryData.length > 0 &&
          categoryData.map((category, index) => {
            return (
              <div className="w-32 h-56 rounded shadow-md" key={category._id}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full object-scale-down"
                />

                <div className="items-center h-9 flex gap-2">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(category);
                    }}
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setOpenConfirmBoxDelete(true);
                      setDeleteCategory(category);
                    }}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {isLoading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          onClose={() => setOpenUploadCategory(false)}
          fetchCategoryData={fetchCategory}
        />
      )}

      {openEdit && (
        <EditCategory
          categoryData={editData}
          onClose={() => setOpenEdit(false)}
          fetchCategoryData={fetchCategory}
        />
      )}

      {openConfirmBoxDelete && (
        <ConfirmBox
          onClose={() => setOpenConfirmBoxDelete(false)}
          onCancel={() => setOpenConfirmBoxDelete(false)}
          onConfirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
