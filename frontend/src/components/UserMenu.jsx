import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import network from "../utils/network";
import allApis from "../config";
import { logoutUser } from "../store/userSlice";
import { TbExternalLink } from "react-icons/tb";
import Divider from "./Divider";
import { isAdminUser } from "../utils/util";

const UserMenu = ({ onClose }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await network({
        ...allApis.logout,
      });

      if (response.data.success) {
        if (onClose) {
          onClose();
        }

        dispatch(logoutUser());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div>
      <div className="font-semibold mb-1">My Account</div>

      <div className="text-sm flex items-center gap-1">
        <span className="max-w-52 text-ellipsis line-clamp-1">{user.name}</span>
        <span className="text-sm text-green-600">
          {" "}
          {user.role === "ADMIN" ? "Admin" : ""}
        </span>

        <Link
          className="hover:text-green-600"
          onClick={handleClose}
          to={"/dashboard/profile"}
        >
          <TbExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        {isAdminUser(user.role) && (
          <Link
            to={"/dashboard/category"}
            className="px-2 hover:bg-green-200 py-1 rounded-md"
          >
            Category
          </Link>
        )}

        {isAdminUser(user.role) && (
          <Link
            to={"/dashboard/subcategory"}
            className="px-2 hover:bg-green-200 py-1 rounded-md"
          >
            Sub Category
          </Link>
        )}

        {isAdminUser(user.role) && (
          <Link
            to={"/dashboard/upload-product"}
            className="px-2 hover:bg-green-200 py-1 rounded-md"
          >
            Upload Product
          </Link>
        )}

        {isAdminUser(user.role) && (
          <Link
            to={"/dashboard/product"}
            className="px-2 hover:bg-green-200 py-1 rounded-md"
          >
            Product
          </Link>
        )}

        <Link
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-green-200 py-1 rounded-md"
        >
          My Orders
        </Link>

        <Link
          to={"/dashboard/address"}
          className="px-2 hover:bg-green-200 py-1 rounded-md"
        >
          Save Address
        </Link>

        <button
          className="text-left px-2 hover:bg-green-200 py-1 rounded-md"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
