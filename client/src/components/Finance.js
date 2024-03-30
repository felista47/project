import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

const Finance = ({ navigation }) => {


  
const getTransactionStatus = async () => {
  try {
      const transactionID = req.transactionID;
      const response = await axios.get(`https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=${transactionID}`, {
          headers: {
              "Authorization": `Bearer ${depToken}`
          }
      });

      console.log("Transaction status:", response.data);
      // Handle transaction status
        } catch (error) {
      console.error("Error retrieving transaction status:", error.message);
  }
};
    return (
      <View>
        <Text>Finance</Text>
      </View>
    )
  
}
export default Finance;

const styles = StyleSheet.create({})