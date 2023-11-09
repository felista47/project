import { View, Text,TextInput,StyleSheet, Button,Alert,TouchableHighlight,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';



const LoginScreen = () => {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')

  return (
    <View style={styles.container} >
      <View style={styles.credentials}>
        <View style={styles.inputContainer}>
        <Ionicons name="mail" size={32} color="green" style={styles.icon}/>
      <TextInput style={styles.input} placeholder="Email" value='email' onChangeText={text =>setEmail(text)}/>
        </View>
      <View style={styles.inputContainer}>
      <Ionicons name="eye-off" size={32} color="#EE6B22" style={styles.icon} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value='password' onChangeText={text =>setPassword(text)}/>
      </View>
      <Text style={styles.text}>Forgot password?</Text>
      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Login successful')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
    </TouchableOpacity>
      </View>

      
       <View>
       <Text style={styles.dontHave}>Don't have an account?</Text>

       <TouchableOpacity style={styles.buttonOne} onPress={() => Alert.alert('Login successful')}>
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