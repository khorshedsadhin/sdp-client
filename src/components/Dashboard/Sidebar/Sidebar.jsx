import React from "react";
import { Link, Navigate, replace, useNavigate } from "react-router";
import { FiLogOut, FiPieChart, FiUser } from "react-icons/fi";
import Logo from "../../Shared/Logo/Logo";
import MenuItem from "./Menu/MenuItem";
import StudentMenu from "./Menu/StudentMenu";
import TutorMenu from "./Menu/TutorMenu";
import AdminMenu from "./Menu/AdminMenu";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({ isActive, setIsActive }) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleLogOut = async() => {
    await logOut();
    navigate('/', { replace: true });
  };

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`z-40 fixed inset-y-0 left-0 flex flex-col justify-between w-64 overflow-y-auto bg-base-100 border-r border-base-200 px-4 py-6 transform min-h-screen transition-transform duration-300 ease-in-out 
        ${isActive ? "translate-x-0 shadow-2xl" : "-translate-x-full"} 
        md:translate-x-0`} 
      >
        <div className="flex flex-col flex-1">
          {/* Logo (Hidden on mobile, layout handles it) */}
          <div className="hidden md:flex items-center justify-center mb-8">
            <Logo />
          </div>
          
          <nav className="flex-1 space-y-2 mt-4">

            {/* Role Based Menus */}
            {role === "student" && <StudentMenu />}
            {role === "tutor" && <TutorMenu />}
            {role === "admin" && <AdminMenu />}

          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-base-200 pt-4 mt-4">
          <MenuItem 
            label="Profile Settings" 
            address="/dashboard/profile" 
            icon={FiUser} 
          />
          
          <button
            onClick={handleLogOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-error transition-all hover:bg-error/10 hover:text-red-600 mt-2"
          >
            <FiLogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay - Only visible when sidebar is active on mobile */}
      {isActive && (
        <div 
          onClick={handleToggle} 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;