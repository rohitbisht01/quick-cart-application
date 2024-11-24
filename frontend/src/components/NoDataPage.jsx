import { FaSearchMinus } from "react-icons/fa";

const NoDataPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <FaSearchMinus className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2">
        No results found
      </h2>
      {/* <p className="text-gray-500 mb-4">
        We couldn&apos;t find any grocery items matching {"searchTerm"}
      </p>
      <div className="text-sm text-gray-400">
        <p>Try checking your spelling or use more general terms</p>
      </div> */}
    </div>
  );
};

export default NoDataPage;
