import { StyleSheet, Text, View, Image,TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { faBell,faChartPie} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import ProductList from './ProductList';
import { useAuth } from '../context/AuthContext'

const VendorHomeScreen = ({navigation}) => {

  const { accountType,userEmail} = useAuth();
  const [greeting, setGreeting] = useState('');

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
  const [vendor, setVendor] = useState(null);
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

  if (!vendor) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
       <View style={styles.containerOne}>
            <TouchableOpacity style={styles.containerProfile}>
              {/* profile pic */}
              <TouchableOpacity style={styles.avatar} onPress={()=>navigation.navigate('Profile')}>
                <Image style={styles.image} source={require('../../assets/avatar.png')} />
              </TouchableOpacity>
              {/* USER GREETINGS */}
              <View style={styles.userGreetings}>
                  <Text style={styles.greetingText}>{greeting},</Text>
                  <Text style={styles.text}>{userEmail}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.containerIcons}>
              <FontAwesomeIcon icon={ faBell } />
              <FontAwesomeIcon icon={ faChartPie } />
            </View>
       </View>
      <ProductList/>
    
      </View>
  );
  }
  export default VendorHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#ECF6FC",
  },
    containerOne: {
      paddingTop:40,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerProfile:{
      padding:10,
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
      flexDirection:'row',
      justifyContent:'space-evenly',
      width:'50%'
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


