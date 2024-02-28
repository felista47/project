import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React,{useEffect} from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const WelcomeScreen = () => {
  const navigation = useNavigation(); 
  const { accountType, setAuthData } = useAuth();

  const checkUserSignInStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const accountType=''
      if (accountType) {
        console.log('User already signed in');
        const homeScreen = accountType === 'parent' ? 'HomeScreen' : 'VendorHomeScreen';
        navigation.navigate(homeScreen) 
        return true;
      } else {
        console.log('User not signed in');
        return false;
      }
    } catch (error) {
      // Handle error, e.g., user is not signed in
      console.error('Error checking user sign-in status:', error);
      return false;
    }
  };
  
const handleAccountSelection = async (type) => {
  try {
    const isUserSignedIn = await checkUserSignInStatus();
    if (isUserSignedIn) {
      const homeScreen = accountType === 'parent' ? 'HomeScreen' : 'VendorHomeScreen';
      navigation.navigate(homeScreen);
    }
    else {
   
      if (type === 'parent') {
        const setAuthDataPromise = new Promise((resolve) => {
          setAuthData('parent'); 
          resolve();
        });
        await setAuthDataPromise;
        await AsyncStorage.setItem('account', accountType);
          navigation.navigate('SignIn');
      }
      else if (type === 'vendor') {
       await setAuthData('vendor');
        navigation.navigate('SignIn');
      }
   }
   console.log('acountType',accountType )
  }
  catch (error) {
    console.error('Error checking user sign-in status:', error);
    navigation.navigate('SignIn'); // Replace with your default screen
  }
}


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/student.jpeg')} />
      <View>
        <Text style={styles.title}>Welcome,{"\n"}Choose Your account to Log in</Text>
      </View>
      <View style={styles.account}>
        <TouchableOpacity
          style={styles.accountItem}
          onPress={() => handleAccountSelection('parent')}
        >
          <Image style={styles.accountImage} source={require('../../assets/parent.png')} />
          <Text style={styles.text}>Parent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountItem}
          onPress={() => handleAccountSelection('vendor')}
        >
          <Image style={styles.accountImage} source={require('../../assets/vendor.png')} />
          <Text style={styles.text}>Vendor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF6FC',
  },
  image: {
    padding: 20,
    height: 140,
    width: 140,
    borderRadius: 999,
  },
  title: {
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  text: {
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'light',
  },
  account: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountItem: {
    alignItems: 'center',
  },
  accountImage: {
    margin: 10,
    borderRadius: 20,
    height: 150,
    width: 150,
  },
});
