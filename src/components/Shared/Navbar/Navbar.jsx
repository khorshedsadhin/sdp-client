import React from "react";
import { NavLink, Link } from "react-router";
import { FiMenu, FiLogIn, FiUserPlus, FiLayout, FiLogOut, FiUser } from "react-icons/fi";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const activeStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 text-primary bg-primary/10 font-medium px-4 py-2 rounded-lg transition-all"
      : "flex items-center gap-2 text-base-content/70 hover:text-primary hover:bg-base-200 px-4 py-2 rounded-lg font-medium transition-all";

  const navItems = (
    <>
        <li>
          <NavLink to={'/'} className={activeStyle}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/tuitions'} className={activeStyle}>Tuitions</NavLink>
        </li>
        <li>
          <NavLink to={'/tutors'} className={activeStyle}>Tutors</NavLink>
        </li>
        <li>
          <NavLink to={'/about'} className={activeStyle}>About</NavLink>
        </li>
        <li>
          <NavLink to={'/contact'} className={activeStyle}>Contact</NavLink>
        </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50  bg-base-100 px-4 md:px-8 border-b border-base-200">
      
      {/* Start: Logo & Mobile Menu */}
      <div className="navbar-start gap-2">
        <div className="dropdown lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle text-primary"
          >
            <FiMenu size={24} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 w-56 rounded-box bg-base-100 p-2 shadow-lg border border-base-200"
          >
            {navItems}
          </ul>
        </div>
        
        <Logo />
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{navItems}</ul>
      </div>

      {/* End: Action Buttons */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-2">
             <Link to="/dashboard">
              <Button label="Dashboard" icon={FiLayout} small />
            </Link>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-0">
                <div className="w-10 rounded-full">
                  <img 
                    src={user?.photoURL || "https://i.ibb.co/MgsTCcv/avater.jpg"}
                    alt="User Profile" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 space-y-2 shadow bg-base-100 rounded-box w-52 border border-base-200">
                
                <Link to={"/dashboard/profile"}>
                  <Button label={'Profile'} icon={FiUser} fullWidth={true} variant="ghost" small/>
                </Link>
                <li>
                  <Button onClick={logOut} icon={FiLogOut} label={'Logout'} fullWidth={true} variant="error" small/>
                </li>
                
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button label="Login" variant="ghost" small={true} icon={FiLogIn} />
            </Link>

            <Link to="/register">
              <Button label="Register" variant="primary" small={true} icon={FiUserPlus} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;