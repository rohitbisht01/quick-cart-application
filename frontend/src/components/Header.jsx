import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const isSearchPage = location.pathname === "/search";

  const user = useSelector((state) => state?.user);

  const handleMobileUser = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };

  return (
    <header className="h-28 sm:h-20 shadow-md sticky top-0 flex flex-col justify-center gap-2">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-2">
          <div className="h-full flex items-center">
            <Link
              to={"/"}
              className="text-3xl font-bold mb-3 text-green-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              QuickCart
            </Link>
          </div>
          <div className="hidden sm:block">
            <Search />
          </div>
          <div>
            <button
              className="text-gray-600 block sm:hidden"
              onClick={handleMobileUser}
            >
              <FaUserCircle size={26} />
            </button>
            <div className="hidden sm:flex items-center gap-4">
              {user?._id ? (
                <div className="relative">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={20} />
                    ) : (
                      <GoTriangleDown size={20} />
                    )}

                    <div>
                      {openUserMenu && (
                        <div className="absolute right-0 top-12">
                          <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                            <UserMenu onClose={() => setOpenUserMenu(false)} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold border p-2 rounded-md px-4"
                >
                  Login
                </button>
              )}

              <button className="flex items-center gap-4 px-2 py-2 bg-green-600 rounded-md text-white">
                <div className="animate-bounce">
                  <TiShoppingCart size={26} color="white" />
                </div>
                <div className="font-semibold">
                  {/* <p>numer of items</p>
                  <p>total price</p> */}
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 sm:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
