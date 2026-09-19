import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function MainLayout() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />{" "}
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLayout;
