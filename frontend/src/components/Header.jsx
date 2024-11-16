import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();

  const isSearchPage = location.pathname === "/search";

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
            <button className="text-gray-600 block sm:hidden">
              <FaUserCircle size={26} />
            </button>
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="font-semibold border p-2 rounded-md px-4"
              >
                Login
              </button>
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
