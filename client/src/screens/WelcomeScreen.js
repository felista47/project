import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';


const WelcomeScreen = () => {
  const navigation = useNavigation(); 
  const { setAuthData } = useAuth();

  
  const handleAccountSelection = async (type) => {
 
        if (type === 'parent') {
          await setAuthData('parent');
          navigation.navigate('SignIn');
        } else if (type === 'vendor') {
          await setAuthData('vendor');
          navigation.navigate('SignIn');
        }
        console.log('accountType', type);

      }
   
  


  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
      <View>
        <Text style={styles.title}>ACCOUNT</Text>
      </View>
      <View style={styles.account}>
        <TouchableOpacity
          style={styles.accountItem}
          onPress={() => handleAccountSelection('parent')}
        >
          <Image style={styles.accountImage} source={require('../../assets/parent.png')} />
          <Text style={styles.text}>Parent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountItem}
          onPress={() => handleAccountSelection('vendor')}
        >
          <Image style={styles.accountImage} source={require('../../assets/vendor.png')} />
          <Text style={styles.text}>Vendor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    paddingLeft:'5%',
    paddingRight:'5%',
    justifyContent: 'center',
    backgroundColor: '#e0f2f1',
  },
  image: {
    padding: 20,
    height: '30%',
    width: '40%',
    alignSelf:'center',
    borderRadius: 999,
  },
  title: {
    fontSize: 24,
    fontFamily:'Roboto',
    fontWeight: 'bold',
    fontStyle:'italic',
    color:'#343a40',
    alignSelf:'center'
  },
  text:{
    padding: '5%',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'light',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#2ECC71',
    width: 150,
    alignSelf: 'center',
    elevation: 8, 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
  },
  account: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountItem: {
    paddingTop:'10%',
    alignItems: 'center',
  },
  accountImage: {
    margin: '2%',
    borderRadius: 20,
    height: '40%',
    width: 150,
  },
});
