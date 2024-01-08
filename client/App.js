import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './navigation';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <MainNavigator />
      
    </NavigationContainer>
  );
}

export default App;
