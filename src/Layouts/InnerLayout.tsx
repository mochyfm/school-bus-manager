import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const InnerLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default InnerLayout;
