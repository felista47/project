import { StyleSheet, Text, View ,Button,Image  } from 'react-native';
import { useAuthentication } from '../authentication';
// import { } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

export default function ProfileScreen() {
  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <Text>Hello {'\n'} {user?.email}!</Text>
      <Image style={styles.image} source={require('../assets/avatar.png')}/>
      {/* <Button title="Sign Out" style={{marginTop:10}} onPress={() => signOut(auth)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor:'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
image:{
width: 50,
height: 50, 
borderRadius: 999,
  }
});