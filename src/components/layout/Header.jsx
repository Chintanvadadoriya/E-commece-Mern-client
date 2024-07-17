import React from 'react';
import { AiOutlineBars } from 'react-icons/ai';

const Header = ({toggleSidebar,isOpen}) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div>
       <AiOutlineBars className="inline-block mr-2"  onClick={toggleSidebar}/>
      <h1 className="text-2xl text-center">E-Commerce Admin Panel</h1>
      </div>
    </header>
  );
};

export default Header;
