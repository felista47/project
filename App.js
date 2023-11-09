// import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorHomeScreen from './screens/VendorHomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen}/>
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="Home" component={VendorHomeScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App