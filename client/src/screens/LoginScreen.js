import { View, Text,TextInput,StyleSheet,TouchableHighlight,TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'


const LoginScreen = ({ navigation}) => {
  const { accountType,setAuthData} = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      console.log('before login',accountType);
      const response = await axios.post(`https://pocket-money.up.railway.app/${accountType}/login`, user);
      console.log('data received from response', response.data);
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
      }catch (error) {
        console.error('Error logging in:', error ,error.response.data.error);
        let errorMessage = 'An error occurred while logging in.';
       if (error.response && error.response.data && error.response.data.errors) {
            errorMessage = error.response.data.errors;
        } else if (error.response && error.response.status === 400) {
            errorMessage = 'Please check your inputs.';
        } else if (error.response && error.response.status === 401) {
            errorMessage = 'Please check your credentials.';
        } else if (error.response && error.response.status === 404) {
            errorMessage = 'user not found.';
        } else if (error.response && error.response.status === 500) {
            errorMessage = 'Internal server error. Please try again later.';
        }
        alert(errorMessage);
    }
    
  };
  
 
  
  return (
    <View behavior="padding" style={styles.container} >
      <Text>You are Signing In as a {accountType}</Text>
      <KeyboardAvoidingView style={styles.credentials}>
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
      </KeyboardAvoidingView>

       <View>
       <Text style={styles.dontHave}>Don't have an account?</Text>

       <TouchableOpacity style={styles.buttonOne} onPress={()=>navigation.navigate('SignUp')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>SignUp</Text>
    </TouchableOpacity>
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
    fontSize: 18,
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
  fontSize: 24

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