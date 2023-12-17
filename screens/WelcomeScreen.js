import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAuthentication } from '../authentication';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useState } from 'react';


const WelcomeScreen = () => {
  const { user } = useAuthentication();
  const navigation = useNavigation(); // Use the useNavigation hook

  const [selectedAccount, setSelectedAccount] = useState(null);


  const handleAccountSelection = (accountType) => {
    setSelectedAccount(accountType);

    if (accountType === 'parent'){ 
      
      navigation.navigate('ParentLogin');
    } else {
      // If the user is not logged in,
      navigation.navigate('ParentSignUp');
    }
    if (accountType === 'Vendor'){ 
      
      navigation.navigate('SignIn');
    } else {
      // If the user is not logged in,
      navigation.navigate('SignUp');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/student.jpeg')} />
      <View>
        <Text style={styles.title}>Welcome,{"\n"}Choose Your account to Log in</Text>
      </View>
      <View style={styles.account}>
        <TouchableOpacity
          style={styles.accountItem}
          onPress={() => handleAccountSelection('parent')}
        >
          <Image style={styles.accountImage} source={require('../assets/parent.png')} />
          <Text style={styles.text}>Parent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountItem}
          onPress={() => handleAccountSelection('vendor')}
        >
          <Image style={styles.accountImage} source={require('../assets/vendor.png')} />
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
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF6FC',
  },
  image: {
    padding: 20,
    height: 140,
    width: 140,
    borderRadius: 999,
  },
  title: {
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  text: {
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'light',
  },
  account: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountItem: {
    alignItems: 'center',
  },
  accountImage: {
    margin: 10,
    borderRadius: 20,
    height: 150,
    width: 150,
  },
});
