import React from "react";
import Navbar from "../components/Shared/Navbar/Navbar";
import Container from "../components/Shared/Container";
import Footer from "../components/Shared/Footer/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar></Navbar>
      
      <div className='min-h-[calc(100vh-68px)]'>
        <Container>
          <Outlet />
        </Container>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
