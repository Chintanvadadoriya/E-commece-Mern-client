import React from 'react';
import { AiOutlineBars } from 'react-icons/ai';

const Header = ({toggleSidebar,isOpen}) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className='flex'>
        <div>
        <AiOutlineBars className="w-8 h-8 inline-block ml-2  cursor-pointer"  onClick={toggleSidebar}/>
        </div>
        <h1 className="text-2xl text-center flex-1">E-Commerce Admin Panel</h1>
      </div>
    </header>
  );
};

export default Header;
