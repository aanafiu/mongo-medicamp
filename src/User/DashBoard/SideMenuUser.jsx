
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SideMenuUser = () => {
  return (
      <div className="p-2 grid md:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center ">
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"/user/addnewpost"}>Analysis</Link>
        </Button>
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"profile"}>My Profile</Link>
        </Button>
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"manage-camps"}>Registered Camps</Link>
        </Button>
        <Button className="w-[70%] text-lg font-bold text-gray-400">
          <Link to={"managemycamps"}>Manage My Camps</Link>
        </Button>
      </div>

  );
};

export default SideMenuUser;
