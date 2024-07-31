/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// ICONS //
import { LuBox, LuMessageSquare } from "react-icons/lu";
import { AiOutlineProduct } from "react-icons/ai";
import { AiOutlineCustomerService } from "react-icons/ai";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
// ICONS //

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(0);
  const location = useLocation();

  const SIDEBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: LuBox },
    { id: 2, path: "/products", name: "Products", icon: AiOutlineProduct },
    { id: 3, path: "/customers", name: "Customers", icon: AiOutlineCustomerService },
    { id: 4, path: "/services", name: "Services", icon: MdOutlineMiscellaneousServices },
    { id: 6, path: "/messages", name: "Messages", icon: LuMessageSquare },
  ];

  useEffect(() => {
    const currentPathIndex = SIDEBAR_LINKS.findIndex(link => link.path === location.pathname);
    setActiveLink(currentPathIndex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };

  return (
        
    
    <div className="w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r   bg-gray-300">
      {/* logo */}
      <center>
      <div className="fluid-contianer mb-0">
        <img src="https://res.cloudinary.com/dhik9tnvf/image/upload/v1722311482/shoe-shine_r7qdcd.jpg" alt="logo" className="w-fit hidden md:flex" />
        <img src="/logo_mini.svg" alt="logo" className="w-8 flex md:hidden" />
      </div>
      </center>
      {/* logo */}
    <div className="px-4">

    
      {/* Navigation Links */}
      <ul className="mt-6 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${
              activeLink === index ? "bg-indigo-100 text-indigo-500" : ""
            }`}
          >
            <Link
              to={link.path}
              className="flex justify-center md:justify-start items-center md:space-x-5"
              onClick={() => handleLinkClick(index)}
            >
              <span>{link.icon()}</span>
              <span className="text-sm text-gray-500 hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Navigation Links */}

      <div className="w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center">
        <p className="flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full">
          <span>?</span>
          <span className="hidden md:flex">Need Help</span>
        </p>
      </div>
      </div>
    </div>
    
  );
};

export default Sidebar;
