import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import ModelChangePassword from '../common/ModelChangePassword';
import { Link, useNavigate } from 'react-router-dom';
import { logout, UserData } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../hook/useToaster';
import NotificationDropdown from '../NotificationDropdown';
import {
  fetchUserProfile,
  getAllUnreadMessages,
  selectUserProfile,
  unReadCountMessages,
} from '../../redux/userProfileSlice';
import { getAuthHeader } from '../../constant';

const Header = ({ toggleSidebar, isOpen }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectUserProfile);

  let { unread_messages } = useSelector(unReadCountMessages);
  const { token, user } = useSelector(UserData);

  const showToast = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpenNotification, setDropdownOpenNotification] =
    useState(false);

  const dropdownRef = useRef(null);
  const dropdownNotificationRef = useRef(null);
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleUserIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
    setDropdownOpenNotification(false); // Close other dropdown
  };

  const handleUserIconClickNotification = () => {
    setDropdownOpenNotification(!isDropdownOpenNotification);
    setDropdownOpen(false); // Close other dropdown
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      dropdownNotificationRef.current &&
      !dropdownNotificationRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
      setDropdownOpenNotification(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen || isDropdownOpenNotification) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen, isDropdownOpenNotification]);

  const ShowUserProfile = () => {
    navigate('/user-profile');
  };

  const LogoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    showToast('success', 'You have successfully Logout!.');
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchUserProfile(getAuthHeader(token)));
    dispatch(getAllUnreadMessages(getAuthHeader(token)));
  }, [token, user]);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <AiOutlineBars
            className="w-8 h-8 ml-2 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <h1 className="text-2xl text-center flex-grow">
          E-Commerce Admin Panel
        </h1>
        <div className="relative flex space-x-4">
          <Link to="/chat">
            <button
              type="button"
              className=" relative inline-flex items-center  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-[45px] h-[45px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
              </svg>

              <span class="sr-only">Notifications</span>
              {unread_messages !== 0 && (
                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                  {unread_messages}
                </div>
              )}
            </button>
          </Link>
          <span ref={dropdownNotificationRef}>
            <button
              type="button"
              className="p-2 relative inline-flex items-center  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                onClick={handleUserIconClickNotification}
                className="w-[32px] h-[32px] text-gray-800 dark:text-white cursor-pointer text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
              </svg>
              <span class="sr-only">Notifications</span>
              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                50
              </div>
            </button>
            {isDropdownOpenNotification && <NotificationDropdown />}
          </span>
          <span ref={dropdownRef}>
            <img
              alt="no img"
              src={data?.profilePicture} // Use a high-resolution image
              onClick={handleUserIconClick}
              className="w-[40px] h-[40px] text-gray-800 dark:text-white cursor-pointer rounded-full border-2 border-gray-300 shadow-lg transition-transform transform hover:scale-110 object-cover"
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 transition duration-200 ease-in-out transform opacity-100 scale-100">
                <span
                  className="block px-4 py-2 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
                  onClick={ShowUserProfile}
                >
                  Profile
                </span>
                <span
                  onClick={openModal}
                  className="block px-4 py-2 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
                >
                  Change Password
                </span>
                <span
                  className="block px-4 py-2 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
                  onClick={LogoutUser}
                >
                  Logout
                </span>
              </div>
            )}
          </span>
        </div>
      </div>
      <ModelChangePassword isOpen={isModalOpen} close={closeModal} />
    </header>
  );
};

export default Header;
