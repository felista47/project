import { Provider } from 'react-redux';
import { store } from './src/reduxStore/store';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation'
import { firebase } from './firebase';


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}