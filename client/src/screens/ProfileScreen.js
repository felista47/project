import { StyleSheet, Text, View, TouchableOpacity,Image,ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { faBell,faChartPie,faChildren,faGears,faQuestion, faScroll, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProfileScreen = () => {
  const { accountType,userEmail,setAuthData} = useAuth();
  const navigation = useNavigation();
  const [parent, setParent] = useState(null);

  const navigateToParent = () => {
    navigation.navigate('Parent'); 
    console.log('profile',accountType,userEmail)

  };
  const navigateToChild = () => {
    navigation.navigate('Child'); 
    console.log('profile',accountType,userEmail)

  };
  const navigateToFinance = () => {
    navigation.navigate('Finance'); 

  };

  useEffect(() => {
    fetchData();
  }, [accountType, userEmail,]);

    const fetchData = async () => {
    console.log('profileBefore fetch',accountType,userEmail)

    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/parent/${userEmail}`, { timeout: 5000 });
      const parentData = response.data;

      if (Array.isArray(parentData) && parentData.length === 0) {
        setParent({}); // Set to an empty object for editing
      } else {
        setParent(parentData);
      }    } catch (error) {
      console.error('Error fetching parent profile data:', error);
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
  


  if (!parent) {
    return <Text>Loading...</Text>;
  }

  return (
<ScrollView style={styles.mainContainer}>
   <Text style={styles.mainContainerName}>ACCOUNT</Text>
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

   <View style={styles.accContainerTwo}>
      <View>
      <TouchableOpacity style={styles.ButtonBlue}>
        <FontAwesomeIcon icon={ faScroll }/>
      </TouchableOpacity>
      <Text style={styles.buttonText}>Transaction Statement</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.ButtonRed}>
          <FontAwesomeIcon icon={ faChartPie }/>
        </TouchableOpacity>
        <Text style={styles.buttonText}>My Spend</Text>
      </View>
    
   </View>

   {/* link to parent personal account info */}
   <TouchableOpacity style={styles.accItem} onPress={navigateToParent}>
      <View  style={styles.accItemIcon} >
        <FontAwesomeIcon icon={ faUser }/>
      </View>
      <View>
        <Text>Account</Text>
        <Text>personal details,edit details,delete account</Text>
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.accItem}onPress={navigateToChild}>
      <View  style={styles.accItemIcon} >
        <FontAwesomeIcon icon={ faChildren }/>
      </View>
      <View>
        <Text>Child Details</Text>
        <Text>student details,edit details</Text>
      </View> 
    </TouchableOpacity>
    <TouchableOpacity style={styles.accItem} onPress={navigateToFinance}>
      <View  style={styles.accItemIcon} >
        <FontAwesomeIcon icon={ faUser }/>
      </View>
      <View>
        <Text>financial Information</Text>
        <Text>Allowance details, set allowance limit</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.accItem}>
      <View  style={styles.accItemIcon} >
      <FontAwesomeIcon icon={ faBell }/>
      </View>
      
      <View>
        <Text>Notification</Text>
        <Text>spending notification</Text>
      </View>
    </TouchableOpacity>

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
  );
};

export default ProfileScreen;

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
    padding:'2%',
    justifyContent: 'space-between',
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
    width: 150,
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
  backgroundColor: '#2ECC71',
  width: 150,
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
  width: 150,
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
