
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const SideMenuUser = () => {
  return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center border-b-2 border-accent py-5">
        <Link to={"analysis"} className="w-full">
          <Button className="w-full text-base font-bold" >Analysis</Button>
        </Link>
        <Link to={"profile"} className="w-full font-bold">
          <Button  className="w-full text-base font-bold">My Profile</Button>
        </Link>
        <Link to={"manage-camps"} className="w-full font-bold">
          <Button  className="w-full text-base font-bold">Registered Camps</Button>
        </Link>
        <Link to={"managemycamps"} className="w-full  font-bold">
          <Button  className="w-full text-base font-bold">Manage My Camps</Button>
        </Link>
      </div>

  );
};

export default SideMenuUser;
