import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#001931] text-white p-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-6">

        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Hero.io Logo" className="w-10 h-10" />
          <h2 className="text-xl font-semibold">HERO.IO</h2>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link to="/about" className="hover:text-[#00D390] transition">About us</Link>
          <Link to="/contact" className="hover:text-[#00D390] transition">Contact</Link>
          <Link to="/installations" className="hover:text-[#00D390] transition">Installations</Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#00D390] transition">
            <FaXTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#00D390] transition">
            <FaYoutube />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#00D390] transition">
            <FaFacebookF />
          </a>
        </div>

      </div>

      {/* Copyright */}
      <p className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} Hero Industries Ltd.
      </p>
    </footer>
  );
};

export default Footer;
