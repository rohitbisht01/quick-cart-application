import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { IoMdArrowRoundBack } from "react-icons/io";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const search = location.pathname === "/search";
    setIsSearchPage(search);
  }, [location]);

  return (
    <div className="w-full border min-w-[300px] lg:min-w-[400px] h-9 sm:h-10 rounded-md flex items-center px-2 bg-gray-100 cursor-pointer  group focus-within:border-green-500">
      {isMobile && isSearchPage ? (
        <IoMdArrowRoundBack
          onClick={() => navigate("/")}
          size={18}
          className="group-focus-within:text-green-500"
        />
      ) : (
        <CiSearch size={18} className="group-focus-within:text-green-500" />
      )}
      {isSearchPage ? (
        <input
          type="text"
          className="w-full outline-none pl-2 text-sm text-gray-700  bg-gray-100"
          placeholder="Search..."
          autoFocus
        />
      ) : (
        <div onClick={() => navigate("/search")}>
          <TypeAnimation
            sequence={[
              "Search 'Fresh Bread'", // Suggestion 1
              1500, // Wait for 1.5 seconds
              "Search 'Organic Vegetables'", // Suggestion 2
              1500, // Wait for 1.5 seconds
              "Search 'Daily Essentials'", // Suggestion 3
              1500, // Wait for 1.5 seconds
              "Search 'Local Honey'", // Suggestion 4
              1500, // Wait for 1.5 seconds
              "Search 'Dairy Products'", // Suggestion 5
              1500, // Wait for 1.5 seconds
              "Search 'Snacks & Beverages'", // Suggestion 6
              1500, // Wait for 1.5 seconds
              () => {
                //   console.log("Search suggestions completed");
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="pl-2 text-sm text-gray-700"
            style={{
              fontSize: "",
              display: "inline-block",
              //  color: "#4CAF50"
            }} // Added color for emphasis
          />{" "}
        </div>
      )}
    </div>
  );
};

export default Search;
