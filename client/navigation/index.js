import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/ProfileScreen'; 
import DepositScreen from '../components/Deposit';
import WithdrawScreen from '../components/Withdraw';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true}} />
      <Stack.Screen name="Deposit" component={DepositScreen} options={{ headerShown: true}} />
      <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{ headerShown: true}} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true}} />

    </Stack.Navigator>
  );
};

export default MainNavigator;
