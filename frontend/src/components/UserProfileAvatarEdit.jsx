import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import network from "../utils/network";
import allApis from "../config";
import { updatedAvatar } from "../store/userSlice";

const UserProfileAvatarEdit = ({ onClose }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsLoading(true);
      const response = await network({
        ...allApis.uploadAvatar,
        data: formData,
      });

      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      toast.error("Error uploading avatar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="text-neutral-800 w-fit block ml-auto"
        >
          <IoClose size={20} />
        </button>

        <div className="w-20 h-20 bg-red-600 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border cursor-pointer px-4 py-1 rounded-md text-sm my-3">
              {isLoading ? "Loading..." : "Upload"}
            </div>
            <input
              type="file"
              id="uploadProfile"
              className="hidden"
              onChange={handleUploadAvatar}
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
