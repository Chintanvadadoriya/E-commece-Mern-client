import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
    console.log('children', children)
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div className="flex h-screen">
      <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} isOpen={isOpen}/>
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
