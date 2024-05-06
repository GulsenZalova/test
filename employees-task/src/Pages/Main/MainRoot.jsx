import React from "react";
import Navbar from "../../Components/Main/Navbar";
import Footer from "../../Components/Main/Footer";
import { Outlet } from "react-router-dom";

function MainRoot() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default MainRoot;
