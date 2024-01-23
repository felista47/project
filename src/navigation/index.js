import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/ProfileScreen'; 
import DepositScreen from '../components/Deposit';
import WithdrawScreen from '../components/Withdraw';
import HomeScreen from '../screens/HomeScreen';
import Parent from '../components/Parent';
import AddProduct from '../screens/AddProduct';
import Cart from '../screens/Cart';
import ProductList from '../screens/ProductList';
import MakePayment from '../components/MakePayment';
import LoginScreen from '../screens/LoginScreen';
import VendorHomeScreen from '../screens/VendorHomeScreen';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Deposit" component={DepositScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{ headerShown: false}} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} /> 
      <Stack.Screen name="VendorHomeScreen" component={VendorHomeScreen} options={{ headerShown: false}} /> 
      <Stack.Screen name="Parent" component={Parent} options={{ headerShown: false}} />
      <Stack.Screen name='SignIn' component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false}} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false}} />  
      <Stack.Screen name="Products" component={ProductList} options={{ headerShown: false}} />
      <Stack.Screen name="MakePayment" component={MakePayment} options={{ headerShown: false}} />

    </Stack.Navigator>
  );
};

export default MainNavigator;
