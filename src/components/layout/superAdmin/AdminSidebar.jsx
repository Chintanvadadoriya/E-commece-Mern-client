import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle, AiOutlineDown } from "react-icons/ai"; // Import down arrow icon


const AdminSidebar = ({ toggleSidebar, isOpen, setIsOpen }) => {

    const [adminOpen, setAdminOpen] = useState(false);



    const toggleAdminOpen = () => {
        setAdminOpen(!adminOpen);

    };


    return (
        <aside className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-0'} fixed h-full top-0 left-0 overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
            <div className='flex justify-end'>
                {isOpen && <AiFillCloseCircle className="w-8 h-8 inline-block ml-2 mt-2 cursor-pointer" onClick={toggleSidebar} />}
            </div>
            <div className="p-4 pt-11 pl-10">
                 <div className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleAdminOpen}>
                        <span className="block">Admin Manage</span>
                        <AiOutlineDown className={`ml-1 ${adminOpen ? 'transform rotate-180' : ''}`} />
                    </div>
                    {adminOpen && (
                        <div className="mt-4 pl-4">
                            <Link to="/admin-create" className="block mb-3">Admin Create</Link>
                            <Link to="/admin-list" className="block mb-3">Admin List</Link>
                        </div>
                    )}
                </div>
        
            </div>
        </aside>
    );
};

export default AdminSidebar;
