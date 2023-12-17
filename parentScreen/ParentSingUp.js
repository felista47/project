import { View, Text,TextInput,StyleSheet,TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React ,{useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth()

const ParentSignUp  = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')


  let validateAndSet = (value,setValue) => {
   setValue(value)
}
function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword){
    setValidationMessage('Password do not match') 
  }
  else setValidationMessage('')
}
  async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('required filled missing')
    : ''
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('ParentLogin');
    } catch (error) {
      setValidationMessage(error.message);
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.credentials}>
        <View style={styles.inputContainer}>
         <Ionicons name="mail" size={32} color="#EE6B22" style={styles.icon}/>
         <TextInput style={styles.input} value={email}
          onChangeText={(text) => setEmail(text)} placeholder="Email"/>
        </View>
        <View style={styles.inputContainer}>
        <Ionicons name="person-circle" size={32} color="#58C2FD" style={styles.icon}/>
        <TextInput style={styles.input} placeholder="user"/>
        </View>
        <View style={styles.inputContainer}>
        <Ionicons name="eye-off" size={32} color="#7282BC" style={styles.icon}/>
      <TextInput style={styles.input} placeholder="password" value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)} secureTextEntry/>
        </View>
      <View style={styles.inputContainer}>
      <Ionicons name="eye-off" size={32} color="green" style={styles.icon} />
      <TextInput style={styles.input} value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry placeholder="confirm Password" onBlur={()=>checkPassword(password,confirmPassword)}/>
      </View>
      {<Text style={styles.error}>{validationMessage}</Text>}
      <Text style={styles.text}>Forgot password?</Text>
      <TouchableOpacity style={styles.button} onPress={createAccount}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Sign Up</Text>
    </TouchableOpacity>
      </View>
       <View>
       <Text style={styles.dontHave}>Already have an account?</Text>
       <TouchableOpacity style={styles.buttonOne} onPress={()=>navigation.navigate('ParentLogin')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
    </TouchableOpacity>
    </View>
    
    </KeyboardAvoidingView>
  )
}

export default ParentSignUp
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