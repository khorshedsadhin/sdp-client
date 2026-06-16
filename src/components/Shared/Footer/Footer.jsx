import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="footer mx-auto max-w-7xl p-10">
        
        {/* Column 1: Brand & About */}
        <aside>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-base-content/80">
            eTuitionBD is a complete platform connecting students with verified
            tutors. We bridge the gap between learning and teaching with
            automated workflows and secure payments.
          </p>
          
          {/* Social Icons */}
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 text-base-content transition-all hover:bg-primary hover:text-white hover:shadow-lg"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 text-base-content transition-all hover:bg-black hover:text-white hover:shadow-lg"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 text-base-content transition-all hover:bg-[#0077b5] hover:text-white hover:shadow-lg"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-base-100 text-base-content transition-all hover:bg-[#E1306C] hover:text-white hover:shadow-lg"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </aside>

        {/* Column 2: Quick Links */}
        <nav>
          <header className="footer-title text-primary opacity-100">Quick Links</header>
          <Link to="/" className="link-hover link text-base-content/80 hover:text-secondary">
            Home
          </Link>
          <Link to="/tuitions" className="link-hover link text-base-content/80 hover:text-secondary">
            Tuition Posts
          </Link>
          <Link to="/tutors" className="link-hover link text-base-content/80 hover:text-secondary">
            Find Tutors
          </Link>
          <Link to="/about" className="link-hover link text-base-content/80 hover:text-secondary">
            About Platform
          </Link>
        </nav>

        {/* Column 3: For Users */}
        <nav>
          <header className="footer-title text-primary opacity-100">For Users</header>
          <Link to="/register" className="link-hover link text-base-content/80 hover:text-secondary">
            Become a Tutor
          </Link>
          <Link to="/register" className="link-hover link text-base-content/80 hover:text-secondary">
            Hire a Tutor
          </Link>
          <Link to="/login" className="link-hover link text-base-content/80 hover:text-secondary">
            Login / Register
          </Link>
          <Link to="/contact" className="link-hover link text-base-content/80 hover:text-secondary">
            Contact Support
          </Link>
        </nav>

        {/* Column 4: Contact Info */}
        <nav>
          <header className="footer-title text-primary opacity-100">Contact</header>
          <span className="text-base-content/80">Dhaka, Bangladesh</span>
          <span className="text-base-content/80">support@etuitionbd.com</span>
          <span className="text-base-content/80">+880 1234 567 890</span>
          
          <div className="mt-2 badge badge-accent badge-outline font-semibold">
            Available 9AM - 6PM
          </div>
        </nav>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-base-content/10 bg-base-200 px-10 py-6 text-center">
        <p className="text-sm text-base-content/60">
          Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="font-bold text-primary">eTuitionBD</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;