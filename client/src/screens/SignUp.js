import { View, Text,TextInput,StyleSheet,TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React ,{useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUpScreen  = ({ navigation }) => {
  const { accountType,setAuthData} = useAuth();
  const [validationMessage, setValidationMessage] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });



  const createAccount = async () => {
      try {
        console.log(user,accountType);
        const response = await axios.post(`http://192.168.43.6:3000/${accountType}/register`, user);
        console.log('data recived from response',response.data);
        const userEmailResponse = response.data.email;
        const uid= response.data.uid;
        await AsyncStorage.setItem('UID', uid);
        setUser({
          email: '',
          password: '',
        });
        setAuthData(accountType, userEmailResponse); // Update the AuthContext values
        alert('Registered  successfully!');
        navigation.navigate('SignIn',);
        console.log('login', accountType, userEmailResponse);
      }
    catch (error) {
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
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.credentials}>

        <View style={styles.inputContainer}>
         <Ionicons name="mail" size={32} color="#EE6B22" style={styles.icon}/>
         <TextInput style={styles.input} value={user.email}
          onChangeText={(text) =>setUser({ ...user,email:text })} placeholder="Email"/>
        </View>

        <View style={styles.inputContainer}>
      <Ionicons name="eye-off" size={32} color="#EE6B22" style={styles.icon} />
      <TextInput style={styles.input} placeholder="Password" value={user.password} onChangeText={(text) =>setUser({ ...user,password:text })}/>
      </View>

      {<Text style={styles.error}>{validationMessage}</Text>}
      <Text style={styles.text}>Forgot password?</Text>

      <TouchableOpacity style={styles.button} onPress={createAccount}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
      </TouchableOpacity>
      </View>
       <View>
       <Text style={styles.dontHave}>Already have an account?</Text>
       <TouchableOpacity style={styles.buttonOne} onPress={()=>navigation.navigate('SignIn')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
    </TouchableOpacity>
    </View>
    
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen
const styles = StyleSheet.create({

  container : {
    flex:1,
    paddingTop: 40,
    padding:30,
    justifyContent:'space-evenly',
    backgroundColor : "#ECF6FC"
  },
  credentials:{
justifyContent:'space-evenly'
  },
  inputContainer: {
    marginTop: 30,
    flexDirection: 'row',
    height:70,
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  
input:{
  flex: 1,
  fontSize: 16,
  color: 'black',
  width:'100%',
},

  text:{
    marginTop:'40',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 'light'
  },
 button:{
  marginTop: 20,
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#58C2FD',
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
  textAlign: 'center',
  fontFamily:'Roboto',
  fontWeight: 'bold',
  fontSize: 24,
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