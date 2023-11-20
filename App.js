// import 'react-native-gesture-handler';
import React from 'react';
import './firebase';
import WelcomeScreen from './screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './components/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'
import VendorHomeScreen from './screens/VendorHomeScreen';
import AddProduct from './screens/AddProduct';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignIn" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={ProfileScreen} />
        <Stack.Screen name="HomeVendor" component={VendorHomeScreen} />
        <Stack.Screen name='addProduct' component={AddProduct}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
