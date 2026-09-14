import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminLoggedIn = () => {
      try {
        const token = localStorage.getItem('admin_token');
        const savedUser = localStorage.getItem('admin_user');
        if (token && savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser.role === 'admin') {
            setUser({ ...parsedUser, token });
          } else {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
          }
        }
      } catch (error) {
        console.error('Session verification failed', error);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      } finally {
        setLoading(false);
      }
    };

    checkAdminLoggedIn();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    setUser({ ...userData, token });
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  const isAdmin = Boolean(user && user.role === 'admin');

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

