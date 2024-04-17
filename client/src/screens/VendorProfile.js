import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView,} from 'react-native';
import React, { useState, useEffect } from 'react';
import { faBell,faChildren,faGears,faQuestion,faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

const VendorProfile = () => {
  const { accountType,userEmail,setAuthData} = useAuth();
  const [vendor, setVendor] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    fetchData();
  }, [accountType, userEmail,]);

  const navigateToVendor = () => {
    navigation.navigate('Vendor'); 
    console.log('profile',accountType,userEmail)

  };
  const navigateToShop = () => {
    navigation.navigate('Shop'); 
    console.log('profile',accountType,userEmail)

  };
  const navigateToShopFinance = () => {
    navigation.navigate('ShopFinance'); 

  };
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

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setAuthData(null,null, null);
      navigation.navigate('WelcomeScreen');
      console.log('Token set to null');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };
  
  if (!vendor) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView style={styles.mainContainer}>
    <Text style={styles.mainContainerName}>ACCOUNT</Text>

  {/* profile pic */}
    <View style={styles.accContainerOne}>
       <View style={styles.containerProfile}>
           {/* profile pic */}
           <TouchableOpacity style={styles.avatar}>
           <Image style={styles.image} source={require('../../assets/avatar.png')} />
           </TouchableOpacity>
           {/* USER GREETINGS */}
    <View style={styles.userMinInfo}>
       <Text style={styles.text}>{userEmail}</Text>
       {/* <Text>{parent.personalInfo.phoneNumber}</Text> */}
    </View>
 
       </View>
       <TouchableOpacity style={styles.ButtonGreen}><Text>Edit picture</Text></TouchableOpacity>
    </View>


   {/* link to parent personal account info */}
   <TouchableOpacity style={styles.accItem}onPress={() =>navigateToVendor()}>
      <View  style={styles.accItemIcon} >
        <FontAwesomeIcon icon={ faUser }/>
      </View>
      <View>
        <Text>Account</Text>
        <Text>personal details,edit,delete account</Text>
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.accItem} onPress={() =>navigateToShop()}>
      <View  style={styles.accItemIcon} >
        <FontAwesomeIcon icon={ faChildren }/>
      </View>
      <View>
        <Text>Shop Details</Text>
        <Text>Shop details,edit details</Text>
      </View> 
    </TouchableOpacity>
    <TouchableOpacity style={styles.accItem} onPress={() =>navigateToShopFinance()}>
      <View  style={styles.accItemIcon} >
        <FontAwesomeIcon icon={ faUser }/>
      </View>
      <View>
        <Text>financial Information</Text>
        <Text>shop balance, Transaction Statement</Text>
      </View>
    </TouchableOpacity>
    {/* <TouchableOpacity style={styles.accItem}>
      <View  style={styles.accItemIcon} >
      <FontAwesomeIcon icon={ faBell }/>
      </View>
      
      <View>
        <Text>Notification</Text>
        <Text> notification</Text>
      </View>
    </TouchableOpacity> */}

    <TouchableOpacity style={styles.accItem}>
      <View  style={styles.accItemIcon} >
      <FontAwesomeIcon icon={ faGears }/>
      </View>
      
      <View>
        <Text>App setting</Text>
        <Text>dark mode</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.accItem}>
      <View  style={styles.accItemIcon} >
        <FontAwesomeIcon icon={ faQuestion }/>
      </View>
      <View>
        <Text>Help</Text>
        <Text>Help center, contact us</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={styles.accButtonRed}onPress={signOut}><Text>LogOut</Text></TouchableOpacity>
    </ScrollView>
  )
}

export default VendorProfile

const styles = StyleSheet.create({
  
  mainContainer:{
    backgroundColor:'#e0f2f1',
    paddingTop:'7%',
    marginBottom:'7',
  },
  mainContainerName:{
    fontSize:24,
    alignSelf:'center',
  },
  accContainerOne: {
    paddingTop:'7%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerProfile:{
    padding:'1%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 999,
  },
  userMinInfo: {
    marginLeft: '5%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accContainerTwo:{
    padding:'3%',
    width:'90%',
    alignSelf:'center',
    marginTop: 15,
    flexDirection:'row',
    justifyContent:'space-between',    
  },
  buttonText:{
    fontSize:15,
  },
  ButtonBlue:{
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#58C2FD',
    width: 120,
    alignSelf: 'center',
    alignItems:'center',
    elevation: 8, 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
},
ButtonGreen:{
  borderRadius: 20,
  padding: 10,
  marginRight: 10,
  backgroundColor: '#2ECC71',
  width: 100,
  alignSelf: 'center',
  alignItems:'center',
  elevation: 8, 
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 6,
},
ButtonRed:{
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#EE6B22',
  width: 120,
  alignSelf: 'center',
  alignItems:'center',
  elevation: 8, 
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 6,
},
  accButtonRed:{
      borderRadius: 20,
      padding: 10,
      backgroundColor: '#EE6B22',
      width: 150,
      marginBottom:50,
      alignSelf: 'center',
      alignItems:'center',
      elevation: 8, 
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
  },
  accItem:{
    width:'95%',
    elevation:2,
    height:100,
    padding:10,
    marginBottom:15,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'white',
    alignSelf:'center',
    alignItems:'center',
  },
  accItemIcon:{
    backgroundColor:'#58C2FD',
    alignItems:'center',
    paddingTop:10,
    width:40,
    height:40,
    borderRadius:999,
    marginLeft:20,
    marginRight:30,
  },
});
