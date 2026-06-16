import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiSearch, FiUserPlus } from "react-icons/fi";
import Button from "../Shared/Button/Button";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
    },
  };

  return (
    <section className="relative overflow-hidden bg-base-100 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col text-center lg:text-left"
          >

            <motion.h1 
              variants={itemVariants} 
              className="text-base-content"
            >
              Find the <span className="text-primary">Perfect Tutor</span> <br />
              for Your Academic Goals
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-base-content/70"
            >
              Connect with qualified tutors or find tuition jobs in your area. 
              <br></br>Simple, secure, and designed for your success.
            </motion.p>

            {/* buttons */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col justify-center items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Link to="/tuitions">
                <Button 
                  label="Find a Tutor" 
                  icon={FiSearch} 
                />
              </Link>
              <Link to="/register">
                <Button 
                  label="Become a Tutor" 
                  variant="ghost" 
                  icon={FiUserPlus} 
                />
              </Link>
            </motion.div>

          </motion.div>

          {/* Right Side: Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 hidden md:flex">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                alt="Students learning"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
          
        </div>
    </section>
  );
};

export default Hero;