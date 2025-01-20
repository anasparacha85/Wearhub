import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../public/logo.png";
import Logo2 from "../../public/logo2.jpg"
import SignupModal from "./SignupModal";
const Header = ({onSignupClick,onloginclick}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-md">
      {/* Top Header */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 bg-gray-700 text-sm text-gray-200">
        <div>WELCOME TO WearHub</div>
        <div className="flex space-x-4">
        <button
          onClick={ onSignupClick}
          className="bg-transparent text-gray-200  rounded hover:text-gray-800"
        >
          SIGN UP
        </button>
        <button
          onClick={ onloginclick}
          className="bg-transparent text-gray-200  rounded hover:text-gray-800"
        >
          LOGIN
        </button>
          <NavLink to="/corporate" className="hover:text-gray-800">
            CORPORATE INQUIRY
          </NavLink>
          <NavLink to="/create-account" className="hover:text-gray-800">
            CREATE AN ACCOUNT
          </NavLink>
          <span>PKR ▼</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-950">
        {/* Logo */}
       
<img src={Logo2} alt="" height={40} width={80} style={{mixBlendMode:'hard-light'}} />
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`absolute md:relative md:flex md:items-center md:space-x-8 top-16 md:top-0 left-0 w-full md:w-auto bg-gray-950 md:bg-transparent transition-all ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink
            to="/"
            className="block px-4 py-2 text-slate-200 md:inline-block hover:text-slate-300"
          >
            HOME
          </NavLink>
        
          <NavLink
            to="/womens"
            className="block px-4 py-2 text-slate-200 md:inline-block hover:text-slate-300"
          >
            WOMEN
          </NavLink>
          <NavLink
            to="/mens"
            className="block px-4 py-2 text-slate-200 md:inline-block hover:text-slate-300"
          >
            MEN
          </NavLink>
        
        
          <NavLink
            to="/new-arrivals"
            className="block px-4 py-2 text-slate-200 md:inline-block hover:text-slate-300"
          >
            NEW ARRIVALS
          </NavLink>
         
         
          <NavLink
            to="/Shop"
            className="block px-4 py-2 md:inline-block text-red-500 font-semibold hover:text-red-600"
          >
            SHOP
          </NavLink>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex space-x-6 items-center">
          <button className="hover:text-gray-800">🛒</button>
          <button className="hover:text-gray-800">🔍</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
