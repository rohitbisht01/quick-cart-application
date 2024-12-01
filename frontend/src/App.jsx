import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { useEffect } from "react";
import { setAllCategory, setLoadingCategory } from "./store/productSlice";
import network from "./utils/network";
import allApis from "./config";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUserData = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategoryData = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await network({
        ...allApis.getCategory,
      });

      if (response.data.success) {
        dispatch(setAllCategory(response.data.data));
      }
    } catch (error) {
      console.log("Error fetching Category Data", error);
      toast.error("Error fetching category data");
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  // const fetchSubCategoryData = async () => {
  //   try {
  //   } catch (error) {
  //     console.log("Error fetching subcategory data");
  //     toast.error("Error fetching subcategory data");
  //   } finally {
  //   }
  // };

  useEffect(() => {
    fetchUserData();
    fetchCategoryData();
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
