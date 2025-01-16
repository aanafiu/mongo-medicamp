import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/ThemeProvider/ThemeProvider";
import { notifySuccess } from "@/User/Common/Notification";
import { UserContext } from "@/User/Provider/AuthProvider";
import { Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  // Theme Control
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // User Auth
  const { userParticipant, logOutUser } = useContext(UserContext);

  const [menuVisible, setMenuVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const toggleDropMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    logOutUser().then(() => {
      notifySuccess("LogOut");
      navigate("/");
    });
  };

  return (
    <div className="w-full flex items-center justify-between my-5">
      {/* Logo */}
      <div>
        <Link to="/" className="text-3xl font-extrabold">
          MediCamp
        </Link>
      </div>

      {/* Desktop Menu */}
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
          to="/test"
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

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden items-center">
        <button
          onClick={toggleMobileMenu}
          className="text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Join Us or User Profile (Desktop Only) */}
      <div className="hidden md:flex justify-center items-center gap-5">
        {!userParticipant ? (
          <Card>
            <Link
              to="/user/login"
              className="text-nowrap text-lg md:text-xl lg:text-2xl"
            >
              Join Us
            </Link>
          </Card>
        ) : (
          <div className="relative flex justify-center items-center text-center">
            {/* Trigger (Profile Picture) */}
            <button
              onClick={toggleDropMenu}
              className="w-[60px] h-[60px] rounded-full"
            >
              <img
                src={userParticipant?.photoURL}
                alt="User Avatar"
                className="w-full h-full rounded-full"
              />
            </button>

            {/* Custom Menu */}
            {menuVisible && (
              <div className="absolute top-[100%] right-0 mt-2 w-48 shadow-md dark:shadow-white rounded-md p-2 space-y-4">
                <div className="font-semibold">{userParticipant.displayName}</div>
                <hr className="my-2" />
                <Link
                  to="/dashboard"
                  className="block py-1 px-2 rounded-md dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-red-500 py-1 px-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Theme Toggle */}
        <Button
          variant="destructive"
          onClick={toggleTheme}
          className="text-2xl"
        >
          {theme !== "dark" ? <Moon /> : <Sun />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuVisible && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-gray-900 z-50 p-4 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-xl absolute top-4 right-4 focus:outline-none"
          >
            &times;
          </button>
          <div className="flex flex-col items-center gap-5 mt-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` text-lg font-bold ${isActive ? "active-link" : "inactive-link"}`
              }
              onClick={toggleMobileMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/test"
              className={({ isActive }) =>
                ` text-lg font-bold ${isActive ? "active-link" : "inactive-link"}`
              }
              onClick={toggleMobileMenu}
            >
              Available Camps
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                ` text-lg font-bold ${isActive ? "active-link" : "inactive-link"}`
              }
              onClick={toggleMobileMenu}
            >
              Dashboard
            </NavLink>

            {!userParticipant ? (
              <Link
                to="/user/login"
                className="text-lg font-bold"
                onClick={toggleMobileMenu}
              >
                Join Us
              </Link>
            ) : (
              <>
                <div className="font-semibold">{userParticipant.displayName}</div>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-bold"
                >
                  Logout
                </button>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="destructive"
              onClick={() => {
                toggleTheme();
                toggleMobileMenu();
              }}
              className="text-2xl"
            >
              {theme !== "dark" ? <Moon /> : <Sun />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
