import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {token} = useSelector(UserData);
  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
