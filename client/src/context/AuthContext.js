import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accountType, setAccountType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const[uid,setUid]=useState('')
  const setAuthData = (type, email,uid) => {
    setAccountType(type);
    setUserEmail(email);
    setUid(uid)
  };

  return (
    <AuthContext.Provider value={{ accountType, userEmail, uid,setAuthData }}>
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
