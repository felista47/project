import { View, Text,TextInput,StyleSheet,TouchableHighlight,TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation}) => {
  const { accountType,token,setAuthData} = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      console.log(user,accountType);
      const response = await axios.post(`https://pocket-money.up.railway.app/${accountType}/login`, user);
      console.log('data recieved from res',response.data);
      const userEmailResponse = response.data.email;
      setUser({
        email: '',
        password: '',
      });
      setAuthData(accountType, userEmailResponse); // Update the AuthContext values

      alert('Logged in successfully!');
      const homeScreen = accountType === 'parent' ? 'HomeScreen' : 'VendorHomeScreen';
      navigation.navigate(homeScreen);
      console.log('login', accountType, userEmailResponse);
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        console.log('Server responded with an error status:', error.response.status);
        if (error.response.status === 401) {
          alert('Invalid email or password. Please try again.');
        } else {
          alert('An error occurred while logging in. Please try again later.');
        }
      } else if (error.request) {
        console.log('No response received from the server.');
        alert('No response received from the server. Please try again later.');
      } else {
        console.log('Error setting up the request:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };
 
  
  return (
    <View style={styles.container} >
      <Text>You are Signing In as a {accountType}</Text>
      <View style={styles.credentials}>
        <View style={styles.inputContainer}>
        <Ionicons name="mail" size={32} color="green" style={styles.icon}/>
      <TextInput style={styles.input} placeholder="Email" value={user.email} onChangeText={(text) =>setUser({ ...user,email:text })}/>
        </View>
      <View style={styles.inputContainer}>
      <Ionicons name="eye-off" size={32} color="#EE6B22" style={styles.icon} />
      <TextInput style={styles.input} placeholder="Password" value={user.password} onChangeText={(text) =>setUser({ ...user,password:text })}/>
      </View>
      {/* {<Text style={styles.error}>{errorMessage}</Text>} */}
      <Text style={styles.text}>Forgot password?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
    </TouchableOpacity>
      </View>

       <View>
       <Text style={styles.dontHave}>Don't have an account?</Text>

       <TouchableOpacity style={styles.buttonOne} onPress={()=>navigation.navigate('SignUp')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>SignUp</Text>
    </TouchableOpacity>
    </View>

       <View style={styles.loginOptions}>
       <TouchableHighlight  style={styles.socials}><Ionicons name="logo-google" color="white"/></TouchableHighlight>
       <TouchableHighlight  style={styles.socials}><Ionicons name="logo-twitter" color="white"/></TouchableHighlight>
       <TouchableHighlight  style={styles.socials}><Ionicons name="logo-facebook" color="white"/></TouchableHighlight>
       </View>
        

    </View>
  )
}

export default LoginScreen
const styles = StyleSheet.create({

  container : {
    flex:1,
    paddingTop: '10%',
    padding:'5%',
    justifyContent:'space-evenly',
    backgroundColor : "#e0f2f1"
  },
  credentials:{
justifyContent:'space-evenly'
  },
  inputContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    height:'15%',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius: 50,
    paddingHorizontal:'5%',
  },
  icon: {
    marginRight: '3%',
  },
  
input:{
  flex: 1,
  fontSize: 16,
  color: 'black',
  width:'100%',
},

  text:{
    marginTop:'4%',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'light'
  },
 button:{
  marginTop: 20,
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#2ECC71',
  width: 150,
  alignSelf: 'center',
  elevation: 8, 
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 6,
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
 
 loginOptions:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
 },

 dontHave:{
  fontFamily:'Roboto',
  fontWeight: 'bold',
fontSize: 32

 },
socials:{
  margin :10,
  width: 64,
  height: 64,
  borderRadius: 32, 
  backgroundColor: '#3b5998',
  justifyContent: 'center',
  alignItems: 'center',
 },
})