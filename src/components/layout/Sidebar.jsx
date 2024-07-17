import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle } from "react-icons/ai";


const Sidebar = ({toggleSidebar,isOpen,setIsOpen}) => {

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <aside className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-0'} fixed h-full top-0 left-0 overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
        {isOpen && <AiFillCloseCircle className="w-55 inline-block ml-60"  onClick={toggleSidebar}/>}
      <div className="p-4 pt-11 pl-10">
        <Link to="/" className="block mb-4" onClick={closeSidebar}>Dashboard</Link>
        <Link to="/products" className="block mb-4" onClick={closeSidebar}>Products</Link>
        <Link to="/order-list" className="block mb-4" onClick={closeSidebar}>Orders</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
