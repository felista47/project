import { StyleSheet, Text, View, Image,TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import ProductList from './ProductList';
import { useAuth } from '../context/AuthContext'

const VendorHomeScreen = ({navigation}) => {

  const { accountType,userEmail} = useAuth();
  const [greeting, setGreeting] = useState('');
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []); 
  
  //fetch vendor data function
  useEffect(() => {
    fetchData();
  }, [accountType, userEmail]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/vendor/${userEmail}`,{ timeout: 5000 });
      const vendorData = response.data;
      setVendor(vendorData); 
       } 
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  if (!vendor) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
       <View style={styles.containerOne}>
            <TouchableOpacity style={styles.containerProfile} onPress={()=>navigation.navigate('VendorProfile')}>
              {/* profile pic */}
              <TouchableOpacity style={styles.avatar} onPress={()=>navigation.navigate('VendorProfile')}>
                <Image style={styles.image} source={require('../../assets/avatar.png')} />
              </TouchableOpacity>
              {/* USER GREETINGS */}
              <View style={styles.userGreetings}>
                  <Text style={styles.greetingText}>{greeting},</Text>
                  <Text style={styles.text}>{userEmail}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.containerIcons}>
           <Text>Balance</Text>
           <Text>KSH.{vendor.shopBal}</Text>
            </View>
       </View>
      <ProductList/>
    
      </KeyboardAvoidingView>
  );
  }
  export default VendorHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#ECF6FC",
  },
    containerOne: {
      paddingTop:30,
      paddingHorizontal:'2%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerProfile:{
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 999,
    },
    userGreetings: {
      marginLeft: 20,
    },
   
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    containerIcons:{
      elevation: 5,
      justifyContent:'space-evenly',
      backgroundColor:'white',
      height:'30%',
      width:'20%',
      alignItems: 'center'
    },
  buttonOne:{
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#EE6B22',
    width: 150,
    alignSelf: 'center',
    elevation: 8, 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },
});


