import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo2 from "../../public/logo2.jpg";
import SignupModal from "./SignupModal";
import { useAuth } from "../Store/Auth";
import { useSelector } from "react-redux";
import Cart from "../Pages/Cart";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { AdminKey } = useAuth();
  const {
    isSignupOpen,
    isloginopen,
    setSignupOpen,
    setisAdminSignupOpen,
    setisloginopen,
  } = useAuth();
  const Jwttoken = useSelector((state) => state.auth.JwtToken);
  const isLoggedIn = !!Jwttoken;

  const onSignupClick = () => setSignupOpen(true);
  const onloginclick = () => setisloginopen(true);

  return (
    <header className="shadow-md relative z-50">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 bg-gray-700 text-sm text-gray-200">
        <div>WELCOME TO WearHub</div>
        <div className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <button onClick={onSignupClick} className="hover:text-gray-800">CREATE AN ACCOUNT</button>
              <button onClick={onloginclick} className="hover:text-gray-800">LOGIN</button>
            </>
          ) : (
            <NavLink to="/Logout">LOGOUT</NavLink>
          )}
          {AdminKey && <NavLink to="/Admin">ADMIN DASHBOARD</NavLink>}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-950">
        {/* Logo */}
        <img src={Logo2} alt="Logo" height={40} width={80} className="mix-blend-hard-light" />

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsCartOpen(true)} className="text-white text-lg">🛒</button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`absolute md:relative md:flex md:items-center md:space-x-8 top-20 md:top-0 left-0 w-full md:w-auto bg-gray-950 md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"} md:block`}>
          <NavLink to="/" className="block px-4 py-2 text-slate-200 hover:text-slate-300">HOME</NavLink>
          <NavLink to="/womens" className="block px-4 py-2 text-slate-200 hover:text-slate-300">WOMEN</NavLink>
          <NavLink to="/mens" className="block px-4 py-2 text-slate-200 hover:text-slate-300">MEN</NavLink>
          <NavLink to="/new-arrivals" className="block px-4 py-2 text-slate-200 hover:text-slate-300">NEW ARRIVALS</NavLink>
          <NavLink to="/Shop" className="block px-4 py-2 text-red-500 font-semibold hover:text-red-600">SHOP</NavLink>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-6 items-center">
          <button onClick={() => setIsCartOpen(true)} className="hover:text-gray-400 text-white text-lg">🛒</button>
          <button className="hover:text-gray-400 text-white text-lg">🔍</button>
        </div>
      </div>

      {/* Slide-in Cart */}
      {isCartOpen && <Cart setIsCartOpen={setIsCartOpen} />}
    </header>
  );
};

export default Header;
