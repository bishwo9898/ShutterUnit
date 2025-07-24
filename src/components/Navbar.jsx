import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Weddings', to: '/weddings' },
    { name: 'Portraits', to: '/portraits' },
    { name: 'Contact', to: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="relative z-30 w-full px-35 py-12 bg-transparent shadow-sm flex items-center justify-between font-serif">
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center h-16">
        <img
          src="/unit.png"
          alt="Logo"
          className="object-contain w-[180px] md:w-[350px] h-auto"
        />
      </div>

      {/* Hamburger Icon (only mobile) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Nav Items */}
      <div className="hidden md:flex flex-grow justify-end space-x-8 pr-8 md:pr-16 lg:pr-24">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.to}
            className={`group relative !text-[#111111eb] text-sm uppercase tracking-widest transition duration-300 ease-in-out hover:!text-[#000000] no-underline ${
              isActive(link.to) ? '!text-[#00000021]' : ''
            }`}
          >
            <span className="block pb-1">{link.name}</span>
            <span
              className={`absolute left-0 bottom-0 h-[2px] bg-[#111111] transition-all duration-300 ease-in-out ${
                isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
        ))}
      </div>

      {/* Desktop Social Icons */}
      <div className="hidden md:flex items-center space-x-4 flex-shrink-0 ml-52">
        <a
          href="https://www.instagram.com/shutterunit/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-6 h-6"
        >
          <FaInstagram className="w-6 h-6 text-black" />
        </a>

        <a
          href="https://www.x.com/shutterunit"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="w-6 h-6"
        >
          <FaTwitter className="w-6 h-6 text-black" />
        </a>

        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-6 h-6 fill-black"
          >
            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.43 0 225.36 0C141.09 0 89.5 54.42 89.5 154.69V195.3H0v92.66h89.5V512h107.86V288z" />
          </svg>
        </a>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-40 py-30 pt-0 space-y-6 font-serif md:hidden z-50">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`group relative !text-[#111111e7] text-sm uppercase tracking-widest transition duration-300 ease-in-out hover:!text-[#000000] no-underline ${
                isActive(link.to) ? '!text-[#000000]' : ''
              }`}
            >
              <span className="block pb-1">{link.name}</span>
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#111111d3] transition-all duration-300 ease-in-out ${
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </Link>
          ))}

          {/* Mobile Social Icons */}
          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://www.instagram.com/shutterunit/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-6 h-6"
            >
              <FaInstagram className="w-6 h-6 text-black" />
            </a>

            <a
              href="https://www.x.com/shutterunit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-6 h-6"
            >
              <FaTwitter className="w-6 h-6 text-black" />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="w-6 h-6 fill-black"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.43 0 225.36 0C141.09 0 89.5 54.42 89.5 154.69V195.3H0v92.66h89.5V512h107.86V288z" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
