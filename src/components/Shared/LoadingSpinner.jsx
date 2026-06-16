import React from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] w-full items-center justify-center">
      <TbFidgetSpinner 
        size={50} 
        className="animate-spin text-primary" 
      />
    </div>
  );
};

export default LoadingSpinner;