import React from 'react';

const Footer = () => {
    const date = new Date();

  const formattedDate = date.getFullYear();
  return (
    <footer className="bg-gray-200 text-center p-4 mt-auto">
      <p>&copy;Reserved By E-Commerce, {formattedDate}</p>
    </footer>
  );
};

export default Footer;
