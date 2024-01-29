import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';



const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator>
            <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
