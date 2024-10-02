"use client";

import { useState } from "react";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon"; // Importa tu ícono

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="mt-5 md:mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex gap-8 items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-800">Shortly</span>
            </Link>

            {/* big screens menu */}
            <div className="hidden md:flex lg:ml-20 md:ml-12 md:space-x-8">
              <Link href="/">
                <span className="header-links">Features</span>
              </Link>
              <Link href="/">
                <span className="header-links">Pricing</span>
              </Link>
              <Link href="/">
                <span className="header-links">Resources</span>
              </Link>
            </div>
          </div>

          {/* big screens */}
          <div className="hidden md:flex md:items-center md:gap-5">
            <Link href="/">
              <span className="text-gray-600 hover:text-gray-900 leading-6 text-base">
                Login
              </span>
            </Link>
            <button className="ml-3 btn text-white">Sign up</button>
          </div>

          {/* burger menu icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </div>

      {/* dropdown opened */}
      {isOpen && (
        <div className="px-2 absolute w-full md:hidden z-30">
          <div className="py-4 mt-4 rounded-md bg-[#1F2937] text-white">
            <div className="mx-auto text-center grid">
              <span className="option-mobile-dropdown">Features</span>
              <span className="option-mobile-dropdown">Pricing</span>
              <span className="option-mobile-dropdown mb-4">Resources</span>
            </div>
            <hr className="border-1 border-[#4B5563]" />
            <div className="py-4 mx-auto text-center space-y-2 grid">
              <span className="option-mobile-dropdown">Login</span>
              <button className="btn py-3 mx-auto">Sign up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
