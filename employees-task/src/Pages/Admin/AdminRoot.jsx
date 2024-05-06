import React from "react";
import Navbar from "../../Components/Admin/Navbar";
import Footer from "../../Components/Admin/Footer";
import { Outlet } from "react-router-dom";

function AdminRoot() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default AdminRoot;
