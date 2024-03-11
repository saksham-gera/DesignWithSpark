import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [IsLoggedIn, setLoggedIn] = useState(false);
  const [Response, setResponse] = useState();

  const isLoggedIn = async () => {
    try {
      if (!localStorage.getItem('token')) {
        console.log("Please Login First!")
      } else {
        const response = await axios.get('http://localhost:5001/users/login', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        console.log('User profile:', response.data);
        if (response.data) {
          setLoggedIn(true);
          setResponse(response);
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Profile fetch failed', error.response);
    }
  }
  useEffect(() => { isLoggedIn() }, [])

  const logout = () => {
    setLoggedIn(false);
    setResponse({});
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ IsLoggedIn, Response, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};