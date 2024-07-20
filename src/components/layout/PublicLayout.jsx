// PublicLayout.js
import React from 'react';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default PublicLayout;
