import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import network from "../utils/network";
import allApis from "../config";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
  });

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await network({
        ...allApis.forgotPassword,
        data: userData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/verification-otp", {
          state: userData,
        });
        setUserData({
          email: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const isValid = Object.values(userData).every((el) => el);

  return (
    <section className="w-full container mx-auto px-2 py-8">
      <div className="mx-auto w-full max-w-lg ">
        <h1 className="font-bold text-xl text-center">Welcome to QuickCart</h1>

        <form className="grid gap-3 mt-6" onSubmit={handleForgotPassword}>
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

          <button
            disabled={!isValid}
            className={`p-2 border rounded-md w-full my-4 text-white font-semibold cursor-pointer ${
              isValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            Send OTP
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

export default ForgotPasswordPage;
