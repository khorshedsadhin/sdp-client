import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="group flex items-center gap-0.5 font-bold tracking-tight transition-opacity hover:opacity-90"
    >
      <span className="text-3xl md:text-4xl text-accent">e</span>
      <span className="text-2xl md:text-3xl text-primary">Tuition</span>
      <span className="text-2xl md:text-3xl text-secondary">BD</span>
    </Link>
  );
};

export default Logo;