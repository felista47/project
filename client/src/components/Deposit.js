import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { useAuth } from '../context/AuthContext'
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';

const Deposit = ({ navigation }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const {userEmail} = useAuth();
  const [phone, setPhone] = useState("");
  const [amount,setAmount] = useState("");
  const [token,setToken]=useState("")
  const [trackingId,setTrackingId]=useState("")

  const createTokenAndRegisterIPN = async () => {
      const data = JSON.stringify({
          "consumer_key": "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW",
          "consumer_secret": "osGQ364R49cXKeOYSpaOnT++rHs="
      });
  
      try {
          // Create token request
          const tokenResponse = await axios.post("https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken", data, {
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              }
          });
  
          const tokenData = tokenResponse.data;
          const token = tokenData.token;
          setToken(token)
          console.log('create token :',token)
          // Register IPN request
          const ipnRegistrationUrl = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN";
  
          const ipnData = JSON.stringify({
              "url": "https://pocket-money.up.railway.app/payment/ipn",
              "ipn_notification_type": "GET"
          });
  
          const ipnHeaders = {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          };
  
          const ipnResponse = await axios.post(ipnRegistrationUrl, ipnData, { headers: ipnHeaders });
  
          const ipnResponseData = ipnResponse.data;
          const ipnId = ipnResponseData.ipn_id;
          const ipnUrl = ipnResponseData.url;
  
          console.log("IPN registration successful");
          console.log("IPN ID:", ipnId);
          console.log("IPN URL:", ipnUrl);
  
          return { token, ipnId, ipnUrl };
      } catch (error) {
          console.error("Error:", error.message);
          throw error;
      }
  };
  
 
  const handleConfirmDeposit = async () => {
  
      try {
          const { token, ipnId } = await createTokenAndRegisterIPN();
          const merchantReference = Math.floor(Math.random() * 1000000000000000000);
          const callbackUrl = "pmms://app/src/components/Finance";
          const branch = "Manoti";
          const headers = {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          };
  
          const data = {
              "id": `${merchantReference}`,
              "currency": "KES",
              "amount": amount,
              "description": "Payment description goes here",
              "callback_url": `${callbackUrl}`,
              "notification_id": `${ipnId}`,
              "branch": `${branch}`,
              "billing_address": {
                  "email_address": `${userEmail}`,
                  "phone_number": phone,
                  "country_code": "KE",
                  "line_1": "Pesapal Limited",
                  "line_2": "",
                  "city": "",
                  "state": "",
                  "postal_code": "",
                  "zip_code": ""
              }
          };
          const response = await axios.post("https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest", data, { headers });
          console.log("Order submission successful:");
          console.log(response.data);
        const redirectURL = response.data.redirect_url;
        const orderTrackingId= response.data.order_tracking_id
        setTrackingId(orderTrackingId)
        console.log('order tracking id:',orderTrackingId)
        await WebBrowser.openBrowserAsync(redirectURL)
        setShowVerify(true)
      } catch (error) {
          console.error("Error submitting order:", error.message);
          if (error.response) {
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
          }
      }
  };
  
 
  const handleContinue = () => {
    setShowConfirmation(true);
  };

  const getTransactionStatus = async () => {
    console.log('req body befor transaction status',trackingId,token)
    try {
        const response = await axios.get(`https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=${trackingId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
  
        console.log("Transaction status:", response.data);
        navigation.navigate('HomeScreen');
        // Handle transaction status
          } catch (error) {
        console.error("Error retrieving transaction status:", error.message);
    }
  };

  return (
    <View>
{!showConfirmation ? ( // Display deposit details form
  <View style={styles.DepContainerOne}>
    <Text style={styles.DepContainerOneText}>Deposit Cash</Text>
    <TextInput
      style={styles.input}
      placeholder="KSH."
      keyboardType="numeric"
      value={amount}
      onChangeText={(text) => setAmount(text)}
    />
    <TextInput
      style={styles.input}
      placeholder="07232"
      value={phone}
      onChangeText={(text) => setPhone(text)}
    />
    <TouchableOpacity style={styles.ButtonBlue} onPress={handleContinue}>
      <Text>Continue</Text>
    </TouchableOpacity>
  </View>
) : ( // Display confirmation view
  <View style={styles.DepContainerTwo}>
    <Text style={styles.DepContainerOneText}>Confirm</Text>
    <View style={styles.confirmDep}>
      <Text style={styles.confirmDepText}>Deposit Cash</Text>
      <View style={styles.confirmDepCard}>
        <View>
          <Text>Number</Text>
          <Text>{phone}</Text>
        </View>
        <View>
          <Text>AMOUNT</Text>
          <Text>{amount}</Text>
        </View>
      </View>
    </View>
    <TouchableOpacity style={styles.ButtonBlue} onPress={handleConfirmDeposit}>
    <Text>CONFIRM DEPOSIT</Text>
    </TouchableOpacity>
    {showVerify &&(
      <View>
          <TouchableOpacity style={styles.ButtonBlue} onPress={getTransactionStatus}>
        <Text>Verify Payment</Text>
      </TouchableOpacity>
      </View>
    )}
  </View>
)}


      
    </View>
  );
};




export default Deposit;

const styles = StyleSheet.create({
  DepContainerOne:{
    paddingTop: 100,
    paddingBottom: 350,
    justifyContent:'space-evenly',
    backgroundColor:'#ECF6FC',
  },
  DepContainerOneText:{
    fontSize:30,
    alignSelf:'center'
  },
  input: {
    width:'80%',
    height: 100,
    marginBottom: 40,
    marginTop:40,
    elevation:4,
    alignSelf:'center',
    paddingLeft: 50,
    fontSize:30,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },
  selectInput:{
    marginBottom: 40,
    marginTop:40,
    paddingLeft: 50,
    fontSize:20,
  },
  ButtonBlue:{
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#58C2FD',
    width: 150,
    alignSelf: 'center',
    alignItems:'center',
    elevation: 8, 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
},
DepContainerTwo:{
  paddingTop: 100,
  paddingBottom: 350,
  justifyContent:'space-evenly',
  backgroundColor:'#ECF6FC',
},
confirmDep:{
justifyContent:'space-between',
alignSelf:'center',
marginBottom:100,
marginTop:100,
paddingTop:50,
width:'95%',
elevation:8,
backgroundColor:'#F8F8FF',
},
confirmDepText:{
  alignSelf:'center'
},
confirmDepCard:{
  justifyContent:'space-evenly',
  marginTop:20,
  backgroundColor:'white',
  elevation:3,
  width:'100%',
  height:200,
  padding:20,
}
});
