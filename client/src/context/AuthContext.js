import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accountType, setAccountType] = useState('default');
  const [userEmail, setUserEmail] = useState('');

  const setAuthData = (type, email) => {
    setAccountType(type);
    setUserEmail(email);
  };

  return (
    <AuthContext.Provider value={{ accountType, userEmail, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
