import FooterSection from "@/components/sections/footer/FooterSection";
import Nav from "@/User/Common/Nav";
import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="mx-auto">
      <div className="w-full bg-white/30 sticky top-0 z-20 backdrop-grayscale mb-10 ">
        <Nav></Nav>
      </div>
      <div className="min-h-full container mx-auto">
        <Outlet></Outlet>
      </div>

      <FooterSection></FooterSection>
     
    </div>
  );
};

export default UserLayout;
