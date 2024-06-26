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
      console.log(user, accountType);
      const response = await axios.post(`https://pocket-money.up.railway.app/${accountType}/signUp`,user);
      console.log('data received from signup response', response.data);
      const userEmailResponse = response.data.email;
      setUser({
        email: '',
        password: '',
      });
      setAuthData(accountType, userEmailResponse); // Update the AuthContext values
      alert('Registered successfully!');
      navigation.navigate('SignIn');
      console.log('signup', accountType, userEmailResponse);
    }catch (error) {
      console.error(error);
      let errorMessage = 'An error occurred while signup in.';
     if (error.response && error.response.data && error.response.data.errors) {
          errorMessage = error.response.data.errors;
      } else if (error.response && error.response.status === 500) {
          errorMessage = 'Internal server error. Please try again later.';
      }
      alert(errorMessage);
  }
  
  };
  

  return (
    <View  behavior="padding" style={styles.container}>
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
    
    </View>
  )
}

export default SignUpScreen
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
    fontSize: 12,
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