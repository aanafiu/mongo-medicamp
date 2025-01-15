import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/ThemeProvider/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  // Theme Control
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="w-full flex items-center justify-between my-5">
      {/* Logo */}
      <div>
        <Link className="text-3xl font-extrabold">MediCamp</Link>
      </div>

      {/* Menu */}
      <div className="hidden md:flex justify-center items-center gap-5 whitespace-nowrap">
        <NavLink
          to="/"
          className={({ isActive }) =>
            ` text-lg font-bold ${isActive ? "active-link" : "inactive-link"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="test"
          className={({ isActive }) =>
            ` text-lg font-bold ${isActive ? "active-link" : "inactive-link"}`
          }
        >
          Available Camps
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            ` text-lg font-bold ${isActive ? "active-link" : "inactive-link"}`
          }
        >
          Dashboard
        </NavLink>
      </div>

      {/* Join Us */}
      <div className="flex justify-center items-center gap-5">
        <Card>
          <Link to="user/login" className="text-nowrap text-lg md:text-xl lg:text-2xl">Join Us</Link>
        </Card>
        <Button variant="destructive" onClick={toggleTheme} className="text-2xl">
          {theme !== "dark" ?<Moon/> : <Sun />}
        </Button>
      </div>
    </div>
  );
};

export default Nav;
