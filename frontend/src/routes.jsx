import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UserMenuMobile from "./pages/UserMenuMobile";
import Dashboard from "./layouts/Dashboard";
import Profile from "./pages/Profile";
import MyOrder from "./pages/MyOrder";
import AddressPage from "./pages/AddressPage";
import CategoryPage from "./pages/CategoryPage";
import AdminPermission from "./layouts/AdminPermission";
import SubCategoryPage from "./pages/SubCategoryPage";
import UploadProduct from "./pages/UploadProduct";
import AdminProductPage from "./pages/AdminProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "verification-otp",
        element: <OtpVerificationPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },

      {
        path: "user",
        element: <UserMenuMobile />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrder />,
          },
          {
            path: "address",
            element: <AddressPage />,
          },
          {
            path: "category",
            element: (
              <AdminPermission>
                <CategoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermission>
                <SubCategoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermission>
                <UploadProduct />
              </AdminPermission>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermission>
                <AdminProductPage />
              </AdminPermission>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
