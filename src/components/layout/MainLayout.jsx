import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { decodeToken } from '../../utils/helpers';
import Header from './Header';
import Sidebar from './Sidebar';
import AdminSidebar from './superAdmin/AdminSidebar';
import Footer from './Footer';
import AdminHeader from './superAdmin/AdminHeader';
import AdminFooter from './superAdmin/AdminFooter';

const MainLayout = ({ children }) => {
  const { token } = useSelector(UserData);
  const [userDataDecode, setUserDataDecode] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const user = decodeToken(token);
    setUserDataDecode(user);
  }, [token]);

  const SidebarComponent = userDataDecode?.userType === 'superAdmin' ? AdminSidebar : Sidebar;
  const HeaderComponent = userDataDecode?.userType === 'superAdmin' ? AdminHeader : Header;
  const FooterComponent = userDataDecode?.userType === 'superAdmin' ? AdminFooter : Footer;

  return (
    <div className="flex h-screen">
      <SidebarComponent setIsOpen={setIsOpen} isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <HeaderComponent toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
        <FooterComponent />
      </div>
    </div>
  );
};

export default MainLayout;
