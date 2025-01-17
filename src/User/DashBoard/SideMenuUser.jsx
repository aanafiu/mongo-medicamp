
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SideMenuUser = () => {
  return (
      <div className="p-2 grid md:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center ">
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"profile"}>My Profile</Link>
        </Button>
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"/user/addnewpost"}>Add New Camp</Link>
        </Button>
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"/user/manageallcamps"}>Manage All Camps</Link>
        </Button>
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"/user/manageallcamps"}>Manage All Camps</Link>
        </Button>
      </div>

  );
};

export default SideMenuUser;
