import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ProfileScreen from '../components/ProfileScreen';
import SearchComponent from '../components/SearchComponent';
import CategoryComponet from '../components/CategoryComponet';

const VendorHomeScreen = () => {

  return (
    <View style={styles.container}>
      <ProfileScreen/>
      <SearchComponent/>
      <CategoryComponet/>
      </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#ECF6FC"

    
  },
});


export default VendorHomeScreen