import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import network from "../utils/network";
import allApis from "../config";

const OtpVerificationPage = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await network({
        ...allApis.verifiyForgotPasswordOtp,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", ""]);

        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const isValid = Object.values(data).every((el) => el);

  return (
    <section className="w-full container mx-auto px-2 py-8">
      <div className="mx-auto w-full max-w-lg ">
        <h1 className="font-bold text-xl text-center">Welcome to QuickCart</h1>

        <form className="grid gap-3 mt-6" onSubmit={handleVerifyOtp}>
          <div className="grid gap-1">
            <label htmlFor="otp" className="font-semibold text-base">
              Enter OTP
            </label>
            <div className="flex gap-2 items-center justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-green-600 text-center font-semibold"
                  />
                );
              })}
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
            Verify OTP
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

export default OtpVerificationPage;
