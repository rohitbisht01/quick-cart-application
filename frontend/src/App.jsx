import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
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
