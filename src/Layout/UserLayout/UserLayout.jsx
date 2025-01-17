import FooterSection from "@/components/sections/footer/FooterSection";
import Nav from "@/User/Common/Nav";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="container mx-auto my-5">
      <Nav></Nav>
      <div className="min-h-screen">
      <Outlet></Outlet>
      </div>
      <FooterSection></FooterSection>
    </div>
  );
};

export default UserLayout;
