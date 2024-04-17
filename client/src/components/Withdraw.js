import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Withdraw = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming soon!!</Text>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f2f1',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', 
  },
});
