import React from "react";
import { FiUsers, FiGrid, FiPieChart, FiAward, FiCreditCard } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem label="User Management" address="/dashboard/admin/users" icon={FiUsers} />
      <MenuItem label="Tuition Management" address="/dashboard/admin/manage-tuitions" icon={FiGrid} />
      <MenuItem label="Reports & Analytics" address="/dashboard/admin/reports" icon={FiPieChart} />
      <MenuItem label="Subscription Plans" address="/dashboard/admin/subscription-plans" icon={FiAward} />
      <MenuItem label="Subscriptions" address="/dashboard/admin/subscriptions" icon={FiCreditCard} />
      <MenuItem label="Posting Credits" address="/dashboard/admin/posting-credits" icon={FaMoneyBillWave} />
    </>
  );
};

export default AdminMenu;