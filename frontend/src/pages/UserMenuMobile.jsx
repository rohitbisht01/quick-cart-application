import UserMenu from "../components/UserMenu";
import { IoMdClose } from "react-icons/io";

const UserMenuMobile = () => {
  return (
    <section className="bg-gray-300 h-full w-full py-1 rounded-md ">
      <button
        onClick={() => window.history.back()}
        className="text-neutral-700 block w-fit ml-auto"
      >
        <IoMdClose size={20} />
      </button>
      <div className="container mx-auto px-3 pb-8">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
