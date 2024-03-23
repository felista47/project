import { Provider } from 'react-redux';
import { store } from './src/reduxStore/store';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation'
import { AuthProvider } from './src/context/AuthContext'


export default function App() {
  return (
    <Provider store={store}>
            <AuthProvider>

      <NavigationContainer>
          <MainNavigator />
      </NavigationContainer>
      </AuthProvider>

    </Provider>
  );
}