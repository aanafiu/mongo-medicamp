import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="space-y-5">
      <div className="py-3 px-6 h-[70px] w-fit rounded-full bg-slate-900 flex items-center justify-center mx-auto">
        <h1 className="text-2xl font-bold">DashBoard</h1>
      </div>
      <div className="w-full">
        <Button className="w-full">
          <Link to={"/admin/profile"}>My Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
