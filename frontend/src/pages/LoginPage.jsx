import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import network from "../utils/network";
import allApis from "../config";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isValid = Object.values(userData).every((el) => el);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await network({
        ...allApis.login,
        data: userData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setUserData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="w-full container mx-auto px-2 py-8">
      <div className="mx-auto w-full max-w-lg ">
        <h1 className="font-bold text-xl text-center">Welcome to QuickCart</h1>

        <form className="grid gap-3 mt-6" onSubmit={handleLoginUser}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-semibold text-base">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              placeholder="Enter name"
              onChange={handleChange}
              className="p-2 border rounded-md text-sm"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="email" className="font-semibold text-base">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              placeholder="Enter email"
              onChange={handleChange}
              className="p-2 border rounded-md text-sm"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password" className="font-semibold text-base">
              Password
            </label>
            <div className="flex p-2 border rounded-md text-sm items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full outline-none"
              />
              <div className="cursor-pointer" onClick={handleShowPassword}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>
          <button
            disabled={!isValid}
            className={`p-2 border rounded-md w-full my-4 text-white font-semibold cursor-pointer ${
              isValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-green-700 hover:text-green-800 transition-colors duration-200"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
