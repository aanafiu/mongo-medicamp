import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { UserContext } from "@/User/Provider/AuthProvider";
import { notifySuccess } from "@/User/Common/Notification";
import { useTheme } from "@/ThemeProvider/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const SideMenu = () => {
  const { logOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser().then(() => {
      notifySuccess("LogOut").then((res) => {
        if (res.isConfirmed) {
          navigate("/user/login");
        }
      });
    });
  };

  // Theme Control
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="space-y-6 min-h-svh">
      <div className="py-3 px-6 h-[70px] w-fit rounded-full text-white bg-primary flex items-center justify-center mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">DashBoard</h1>
      </div>

      <div className="w-full flex flex-col space-y-5">
        <Link to={"profile"}>
          <Button className="w-full whitespace-normal h-fit text-base md:text-lg font-bold">
            My Profile
          </Button>
        </Link>

        <Link to={"addnewpost"}>
          <Button className="w-full whitespace-normal h-fit text-base md:text-lg font-bold">
            Add New Camp
          </Button>
        </Link>

        <Link to={"manageallcamps"}>
          <Button className="w-full whitespace-normal h-fit text-base md:text-lg font-bold">
            Manage All Camps
          </Button>
        </Link>

        <Link to={"manageregistrationcamps"}>
          <Button className="w-full whitespace-normal h-fit text-base md:text-lg font-bold">
            Manage Registered Camps
          </Button>
        </Link>

        <div className="absolute w-full flex gap-2 justify-center items-center bottom-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link to={"/"}>
            <Button variant="destructive" className="w-fit text-lg font-bold">
              <FaHome />
            </Button>
          </Link>

          <Button onClick={handleLogout} className="w-fit text-lg font-bold ">
            <IoIosLogOut />
          </Button>

          {/* Theme Toggle */}
          <Button variant="destructive" onClick={toggleTheme} className="text-2xl">
            {theme !== "dark" ? <Moon /> : <Sun />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
