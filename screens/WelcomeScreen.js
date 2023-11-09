import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/student.jpeg')}/>
      <View>
        <Text style={styles.title}>Welcome,{"\n"}Choose Your account to Log in</Text>
      </View>
      <View style={styles.account}>
        <View style={styles.accountItem}>
          <Image style={styles.accountImage} source={require('../assets/parent.png')}/>
          <Text style={styles.text}>Parent</Text>
          </View>
        <View style={styles.accountItem}>
          <Image style={styles.accountImage} source={require('../assets/vendor.png')}/>
          <Text style={styles.text}>Vendor</Text>
          </View>
      </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({

  container : {
    flex:1,
    paddingTop: 100,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor : "#ECF6FC"
  },
  image:{
    padding: 20,
    height : 140,
    width: 140,
    borderRadius :999
  },
  title:{
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  text:{
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'light'
  },
  account:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between'

  },
  accountImage:{
margin:10,
borderRadius:20,
height: 150,
width: 150,
  }
})