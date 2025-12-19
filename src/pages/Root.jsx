import { Outlet, useNavigation } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import LoadingSpinner from "../Components/loadingSpinner";

const Root = () => {
  const navigation = useNavigation();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      
      {navigation.state === "loading" && <LoadingSpinner />}

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
