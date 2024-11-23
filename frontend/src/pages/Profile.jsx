import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import toast from "react-hot-toast";
import network from "../utils/network";
import allApis from "../config";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdateUserInfo = async (e) => {
    try {
      setIsLoading(true);

      const response = await network({
        ...allApis.updateUserInfo,
        data: userData,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      toast.error("Error updating user information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* profile upload and display image */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>

      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm min-w-20 border px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit
          onClose={() => setOpenProfileAvatarEdit(false)}
        />
      )}

      {/* name, password, email , mobile update */}
      <form className="my-4 grid gap-4" onSubmit={handleUpdateUserInfo}>
        <div className="grid">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userData.name}
            onChange={handleOnChange}
            name="name"
            className="p-2 border rounded-md outline-none "
            required
          />
        </div>

        <div className="grid">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={handleOnChange}
            name="email"
            className="p-2 border rounded-md outline-none "
            required
          />
        </div>

        <div className="grid">
          <label className="font-semibold">Mobile</label>
          <input
            type="text"
            placeholder="Enter your mobile"
            value={userData.mobile}
            onChange={handleOnChange}
            name="mobile"
            className="p-2 border rounded-md outline-none "
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold rounded">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
