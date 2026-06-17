import React from "react";
import { FiLayers, FiCheckCircle, FiDollarSign } from "react-icons/fi";
import MenuItem from "./MenuItem";

const TutorMenu = () => {
  return (
    <>
      <MenuItem label="My Applications" address="/dashboard/tutor/my-applications" icon={FiLayers} />
      <MenuItem label="Ongoing Tuitions" address="/dashboard/tutor/ongoing-tuitions" icon={FiCheckCircle} />
      <MenuItem label="Revenue History" address="/dashboard/tutor/revenue" icon={FiDollarSign} />
    </>
  );
};

export default TutorMenu;