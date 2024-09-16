import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineDown } from "react-icons/ai"; // Import down arrow icon


function SidebarSection({ title, isOpen, toggleOpen, links }) {
  return (
    <>
     <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
            <span className="block">{title}</span>
            <AiOutlineDown className={`ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
            <div className="mt-4 pl-4">
                {links.map((link, index) => (
                    <Link key={index} to={link.path} className="block mb-3">{link.label}</Link>
                ))}
            </div>
        )}
    </div>
    </>
  )
}

export default SidebarSection