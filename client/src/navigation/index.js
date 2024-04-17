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
import LoginScreen from '../screens/LoginScreen';
import VendorHomeScreen from '../screens/VendorHomeScreen';
import SignUp from '../screens/SignUp';
import Child from '../components/Child';
import Finance from '../components/Finance';
import VendorProfile from '../screens/VendorProfile';
import Shop from '../components/Shop'
import Vendor from '../components/Vendor'
import ShopFinance from '../components/ShopFinance'
import QR from '../components/QR'

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
      <Stack.Screen name="Child" component={Child} options={{ headerShown: false}} />
      <Stack.Screen name="Finance" component={Finance} options={{ headerShown: false}} />
      <Stack.Screen name='SignIn' component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false}} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false}} />  
      <Stack.Screen name="Products" component={ProductList} options={{ headerShown: false}} />
      <Stack.Screen name="VendorProfile" component={VendorProfile} options={{ headerShown: false}} />
      <Stack.Screen name="Shop" component={Shop} options={{ headerShown: false}} />
      <Stack.Screen name="ShopFinance" component={ShopFinance} options={{ headerShown: false}} />
      <Stack.Screen name="Vendor" component={Vendor} options={{ headerShown: false}} />
      <Stack.Screen name="GenerateQr" component={QR} options={{ headerShown: false}} />

    </Stack.Navigator>
  );
};

export default MainNavigator;
