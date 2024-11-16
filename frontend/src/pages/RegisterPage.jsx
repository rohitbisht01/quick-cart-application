import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import network from "../utils/network";
import allApis from "../config";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const isValid = Object.values(userData).every((el) => el);

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      return toast.error("Password and confirm password does not match");
    }

    try {
      const response = await network({
        ...allApis.register,
        data: userData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setUserData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="w-full container mx-auto px-2 py-8">
      <div className="mx-auto w-full max-w-lg ">
        <h1 className="font-bold text-xl text-center">Welcome to QuickCart</h1>

        <form className="grid gap-3 mt-6" onSubmit={handleRegisterUser}>
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

          <div className="grid gap-1">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-base"
            >
              Confirm Password
            </label>
            <div className="flex p-2 border rounded-md text-sm items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={userData.confirmPassword}
                placeholder="Enter confirm password"
                onChange={handleChange}
                className="w-full outline-none"
              />
              <div
                className="cursor-pointer"
                onClick={handleShowConfirmPassword}
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
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
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-700 hover:text-green-800 transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
