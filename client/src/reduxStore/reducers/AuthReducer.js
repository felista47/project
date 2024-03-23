import React, { createContext, useReducer, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');

        if (user) {
          dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
        }
      } catch (error) {
        console.error('Error loading user from AsyncStorage:', error);
      }
    };

    loadUser();
  }, []);

  const saveUser = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to AsyncStorage:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user from AsyncStorage:', error);
    }

    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
