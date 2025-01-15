import Nav from "@/User/Common/Nav";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="container mx-auto my-5">
      <Nav></Nav>
      <Outlet></Outlet>
    </div>
  );
};

export default UserLayout;
