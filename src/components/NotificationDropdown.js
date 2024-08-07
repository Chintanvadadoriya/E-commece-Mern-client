import React, { useState } from 'react';

const NotificationDropdown = () => {
  const [showAll, setShowAll] = useState(false);

  const notifications = [
    { id: 1, message: 'New order received', time: '2 mins ago' },
    { id: 2, message: 'Product stock low', time: '10 mins ago' },
    { id: 3, message: 'New customer registered', time: '1 hour ago' },
    { id: 4, message: 'Order #1234 has been shipped', time: '3 hours ago' },
    { id: 5, message: 'New review on product X', time: '5 hours ago' },
    { id: 6, message: 'Supplier updated stock', time: '1 day ago' },

  ];

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <div className="relative">

      { (
        <div className=" z-10 absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Notifications
            </h3>
            {displayedNotifications.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">No notifications</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {displayedNotifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-2 border-b border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {notifications.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="mt-2 w-full text-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
              >
                {showAll ? 'Show Less' : 'View More'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
