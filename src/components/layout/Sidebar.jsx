import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle } from "react-icons/ai"; // Import down arrow icon
import SidebarSection from '../SidebarSection/SidebarSection';
import { sections } from '../SidebarSection/sectionsName';



const Sidebar = ({ toggleSidebar, isOpen, setIsOpen }) => {

    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };
    return (
      <aside
        className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-0'} fixed h-full top-0 left-0 overflow-y-auto transition-all duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end">
          {isOpen && (
            <AiFillCloseCircle
              className="w-8 h-8 inline-block ml-2 mt-2 cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
        </div>
        <div className="p-4 pt-11 pl-10">
          <Link to="/dashboard" className="block mb-4">
            Dashboard
          </Link>
          {sections.map((section, index) => (
            <SidebarSection
              key={index}
              title={section.title}
              isOpen={openSection === section.title}
              toggleOpen={() => toggleSection(section.title)}
              links={section.links}
            />
          ))}
        </div>
      </aside>
    );
};

export default Sidebar;
