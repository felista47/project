import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryComponet = () => {
  return (
    <View style={styles.container}>
      <Text>CATEGORIES</Text>
      <View style={styles.category}>
      <TouchableOpacity style={styles.buttonOne} onPress={()=>navigation.navigate('addProduct')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>FOOD</Text>
    </TouchableOpacity><TouchableOpacity style={styles.buttonTwo} onPress={()=>navigation.navigate('addProduct')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>STATIONARY</Text>
    </TouchableOpacity>
      </View>
     
    </View>
  )
}

export default CategoryComponet

const styles = StyleSheet.create({
  container:{
    paddingLeft:20,
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
  buttonTwo:{
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
  category:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:20,

  },
})