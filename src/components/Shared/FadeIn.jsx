import React from "react";
import { motion } from "framer-motion";

const FadeIn = ({ 
  children, 
  direction = "up",
  delay = 0, 
  duration = 0.5,
  className = "",
  fullWidth = false
}) => {

  const getDirection = () => {
    switch (direction) {
      case "up": return { y: 40, x: 0 };
      case "down": return { y: -40, x: 0 };
      case "left": return { x: 40, y: 0 };
      case "right": return { x: -40, y: 0 };
      default: return { y: 0, x: 0 };
    }
  };

  const initialVariant = {
    opacity: 0,
    ...getDirection()
  };

  const targetVariant = {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: duration,
      delay: delay,
      ease: "easeOut"
    }
  };

  return (
    <motion.div
      initial={initialVariant}
      whileInView={targetVariant}
      viewport={{ once: true, margin: "-50px" }}
      className={`${fullWidth ? "w-full" : "w-auto"} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;