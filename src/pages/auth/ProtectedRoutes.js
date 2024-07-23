import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import MainLayout from '../../components/layout/MainLayout';
import PublicLayout from '../../components/layout/PublicLayout';
import { decodeToken } from '../../utils/helpers';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token } = useSelector(UserData);
  const user = decodeToken(token);


  if (!token ||  !allowedRoles?.includes(user.userType)) {
    console.log('protect router call thay chhe',)
    return <Navigate to="/" />;
  }


  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

const PublicRoute = ({ children }) => {
    const { token } = useSelector(UserData);
    const user = decodeToken(token);
  
    if (token && user) {
      // Redirect based on user role
      if (user.userType === 'admin') {
        return <Navigate to="/dashboard" />;
      } else if (user.userType === 'superAdmin') {
        return <Navigate to="/admin-list" />;
      }
    }
  return (
    <PublicLayout>
      {children}
    </PublicLayout>
  );
};

export { ProtectedRoute, PublicRoute };
