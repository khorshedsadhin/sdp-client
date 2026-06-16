import React, { useState } from "react";
import { Outlet } from "react-router";
import { FiMenu } from "react-icons/fi";
import Logo from "../components/Shared/Logo/Logo";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="relative min-h-screen bg-base-200 font-manrope">
      
      {/* ----------------- Mobile Header ----------------- */}
      <div className="flex items-center justify-between bg-base-100 px-4 py-3 shadow-sm border-b border-base-300 md:hidden">
        <Logo />
        <button
          onClick={handleToggle}
          className="rounded-lg p-2 text-primary focus:bg-base-200 focus:outline-none"
        >
          <FiMenu size={24} />
        </button>
      </div>

      <div className="flex">
        
        {/* ----------------- Sidebar ----------------- */}
        {/* We pass the 'isActive' state to the Sidebar to handle mobile visibility */}
        <Sidebar isActive={isActive} setIsActive={setIsActive} />

        {/* ----------------- Main Content ----------------- */}
        <div className="flex-1 md:ml-64">
          <div className="p-4 md:p-8">
            {/* This is where your dashboard pages (Add Tuition, Profile, etc.) will load */}
            <Outlet />
          </div>
        </div>
        
      </div>

      {/* ----------------- Mobile Overlay ----------------- */}
      {/* Clicking this dark background closes the sidebar on mobile */}
      {isActive && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden"
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;