import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'
import axios from 'axios';


const Deposit = ({navigation}) => {
  const [parent, setParent] = useState('');
  const [number, setNumber] = useState("");
  const [operator, setOperator] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {userEmail} = useAuth();
  const [editedData, setEditedData] = useState({
    financialInformation: {
      allowanceBalAmount: '',
    },
  });

  const handleContinue = () => {
    // Convert allowance balance amount to number
    const allowanceBalAmount = parseFloat(editedData.financialInformation.allowanceBalAmount);
    // Update editedData with the converted value
    setEditedData({ ...editedData, financialInformation: { ...editedData.financialInformation, allowanceBalAmount } });
    setParent(editedData)
    setShowConfirmation(true);
  };
 
  // const handleConfirmDeposit = async () => {
  //   try {
  //     console.log(number)
  //     const response = await axios.post(`https://tinybitdaraja-4f90552ae4f6.herokuapp.com/msp/hck/76892`, {
  //       "account": "02303879986150",
  //       "paybill": "542542",
  //       "amount": amount,
  //       "number":{value:number}
  //     });
  //     if (response.status === 200) {
  //       await updateBalance();

  //       // show pop up
  //       Alert.alert('Deposit Alert', `Mpesa pop up has been sent to ${number}`, [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel'
  //         },
  //         { text: 'Ok', onPress: () =>{navigateToHome}  },
  //       ]);
  //     } 
  //   }
  //   catch (error){
  //     // show error
  //     await updateBalance();
  //     navigateToHome()
  //     console.error('Error making API request:', error);

  //   }
  // };

  const handleConfirmDeposit = async () => {
    try {
      
      console.log(editedData)
      // Make API request to update user data
      await axios.patch(`https://pocket-money.up.railway.app/parent/${userEmail}`, editedData);

      // Update local state with edited data
      alert('deposit made succesfully')
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  

  return (
    <View>
      {!showConfirmation ? ( // Display deposit details form
        <View style={styles.DepContainerOne}>
          <Text style={styles.DepContainerOneText}>Deposit Cash</Text>
          <TextInput style={styles.input}
           placeholder="KSH."
           keyboardType="numeric"
           value={editedData.financialInformation.allowanceBalAmount}
           onChangeText={(text) => setEditedData({ ...editedData, financialInformation: { ...editedData.financialInformation, allowanceBalAmount: text } })}
         />
          <TextInput style={styles.input} placeholder="07232" value={number}onChangeText={(text) =>setNumber(text)}/>
        <Picker
            selectedValue={operator}
            onValueChange={(itemValue) => setOperator(itemValue)}
            style={styles.selectInput}
          >
            <Picker.Item label="Select your operator" value="" />
            <Picker.Item label="M-pesa" value="M-pesa" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
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
                <Text>SOURCE OF FUNDS</Text>
                <Text>{operator}</Text>
              </View>
              <View>
                <Text>Number</Text>
                <Text>{number}</Text>
              </View>
              <View>
                <Text>AMOUNT</Text>
                <Text>{parent.financialInformation.allowanceBalAmount}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.ButtonBlue} onPress={handleConfirmDeposit}>
            <Text>CONFIRM DEPOSIT</Text>
          </TouchableOpacity>
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
