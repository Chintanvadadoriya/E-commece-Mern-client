import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { UserData } from '../redux/authSlice';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);


  const { user } = useSelector(UserData);
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);

      if (user && user.email) {
        newSocket.emit('login', user.email);
      }
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('Socket disconnected');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

    useEffect(() => {
    // Listen for active users updates
    socket?.on('active users', (users) => {
      setActiveUsers(users);
    });

    // Handle cleanup on component unmount
    return () => {
      socket?.off('active users');
    };
  }, [socket]);

  console.log('SocketContext establish 1612199', connected);

  return (
    <SocketContext.Provider value={{ socket, connected,activeUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
