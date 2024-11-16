import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const customerSerivcesLinks = [
  "Track Order",
  "Returns & Exchanges",
  "FAQs",
  "Help Center",
];

const companyLinks = [
  "About",
  "Careers",
  "Privacy Policy",
  "Terms of Services",
];

const Footer = () => {
  return (
    <footer className="container mx-auto grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-4 my-8 px-4 py-6 bg-gray-100 rounded-lg">
      <div className="col-span-1 sm:col-span-2">
        <h1 className="text-3xl font-bold mb-3 text-green-600 cursor-pointer">
          <a href="#">QuickCart</a>
        </h1>
        <p className="text-gray-700">
          Your one-stop destination for fresh groceries delivered to your door.
          Quality, convenience, and great prices – all in one app.
        </p>
      </div>

      <div className="col-span-1">
        <h3 className="mb-3 font-bold text-base">CUSTOMER SERVICE</h3>
        <div className="flex flex-col gap-1 text-gray-700">
          {customerSerivcesLinks.map((item) => (
            <a href="#" key={item} className="">
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="col-span-1">
        <h3 className="mb-3 font-bold text-base">COMPANY</h3>
        <div className="flex flex-col gap-1 text-gray-700">
          {companyLinks.map((item) => (
            <a href="#" key={item}>
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="col-span-1">
        <h3 className="mb-3 font-bold text-base">FOLLOW US</h3>
        <div className="flex flex-row gap-4 items-center">
          <a href="#" className="text-blue-500 hover:text-blue-600">
            <FaTwitter size={18} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <IoLogoInstagram size={18} />
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-800">
            <FaFacebookSquare size={18} />
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-700">
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
