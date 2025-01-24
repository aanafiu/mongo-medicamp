
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SideMenuUser = () => {
  return (
      <div className="p-2 grid md:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center ">
        <Link to={"analysis"} className="w-full">
          <Button className="w-full text-base font-bold text-gray-400" >Analysis</Button>
        </Link>
        <Link to={"profile"} className="w-full font-bold text-gray-400">
          <Button  className="w-full text-base font-bold text-gray-400">My Profile</Button>
        </Link>
        <Link to={"manage-camps"} className="w-full font-bold text-gray-400">
          <Button  className="w-full text-base font-bold text-gray-400">Registered Camps</Button>
        </Link>
        <Link to={"managemycamps"} className="w-full  font-bold text-gray-400">
          <Button  className="w-full text-base font-bold text-gray-400">Manage My Camps</Button>
        </Link>
      </div>

  );
};

export default SideMenuUser;
