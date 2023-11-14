import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../authentication';
import { Button } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();
const VendorHomeScreen = () => {

  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Button title="Sign Out" style={{marginTop:10}} onPress={() => signOut(auth)} />
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default VendorHomeScreen