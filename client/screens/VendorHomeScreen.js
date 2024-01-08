import React from 'react'
import {  StyleSheet,TouchableOpacity, Text, View } from 'react-native';
import ProfileScreen from '../components/ProfileScreen';
import SearchComponent from '../components/SearchComponent';
import CategoryComponet from '../components/CategoryComponet';
import ProductDetail from '../components/ProductDetail';

const VendorHomeScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <ProfileScreen/>
      <SearchComponent/>
      <CategoryComponet/>
      <ProductDetail/>
      <TouchableOpacity style={styles.buttonOne} onPress={()=>navigation.navigate('addProduct')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Add Product</Text>
    </TouchableOpacity>
      </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#ECF6FC"

    
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
});


export default VendorHomeScreen