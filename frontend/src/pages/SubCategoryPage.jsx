import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import toast from "react-hot-toast";
import network from "../utils/network";
import allApis from "../config";
import EditSubcategory from "../components/EditSubcategory";
import { TiPencil } from "react-icons/ti";
import { createColumnHelper } from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import DisplayTable from "../components/DisplayTable";
import ConfirmBox from "../components/ConfirmBox";

const SubCategoryPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageUrl, setImageUrl] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmDialog] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setIsLoading(true);
      const response = await network({
        ...allApis.getSubCategory,
      });

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching subcategory", error);
      toast.error("Error fetching subcategory");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const handleDeleteSubcategory = async () => {
    try {
      const response = await network({
        ...allApis.deleteSubCategory,
        data: deleteSubCategory,
      });

      if (response.data.success) {
        toast.success("Subcategory Deleted");
        fetchSubCategory();
        setOpenDeleteConfirmDialog(false);
        setDeleteSubCategory({
          _id: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        console.log("row");
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setImageUrl(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
              className="p-2 bg-green-100 rounded-full hover:text-green-600"
            >
              <TiPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmDialog(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <section className="">
      <div className="flex items-center justify-between p-2 shadow-sm">
        <h1 className="font-semibold">Sub Category</h1>
        <button
          className="text-sm rounded-md border py-1 px-2 hover:bg-gray-200"
          onClick={() => setOpenAddSubCategory(true)}
        >
          Add Sub Category
        </button>
      </div>

      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          onClose={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openEdit && (
        <EditSubcategory
          data={editData}
          onClose={() => setOpenEdit(false)}
          fetchSubCategoryData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <ConfirmBox
          onCancel={() => setOpenDeleteConfirmDialog(false)}
          onConfirm={handleDeleteSubcategory}
          onClose={() => setOpenDeleteConfirmDialog(false)}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
