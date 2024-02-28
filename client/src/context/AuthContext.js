import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accountType, setAccountType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const[token,setToken]=useState('')
  const setAuthData = (type, email,token) => {
    setAccountType(type);
    setUserEmail(email);
    setToken(token)
  };

  return (
    <AuthContext.Provider value={{ accountType, userEmail, token,setAuthData }}>
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
