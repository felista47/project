import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';




const Deposit = () => {

  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [operator, setOperator] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleContinue = () => {
    // Validate the entered values if needed
    // For simplicity, we'll just show the confirmation without validation
    setShowConfirmation(true);
  };
 
  const handleConfirmDeposit = () => {
    // Implement the logic for confirming the deposit
    console.log('Deposit confirmed:', { amount, operator });
    // Reset the values and hide the confirmation view
    setShowConfirmation(false);
    navigation.navigate('Home'); 


  };

  return (
    <View>
      {!showConfirmation ? ( // Display deposit details form
        <View>
          <Text>Deposit Cash</Text>
          <TextInput
            style={styles.input}
            placeholder="KSH."
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
          <Picker
            selectedValue={operator}
            onValueChange={(itemValue) => setOperator(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Select your operator" value="" />
            <Picker.Item label="M-pesa" value="M-pesa" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <TouchableOpacity onPress={handleContinue}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      ) : ( // Display confirmation view
        <View>
          <Text>Deposit Cash</Text>
          <View>
            <Text>SOURCE OF FUNDS: {operator}</Text>
            <Text>AMOUNT: {amount}</Text>
          </View>
          <TouchableOpacity onPress={handleConfirmDeposit}>
            <Text>CONFIRM DEPOSIT</Text>
          </TouchableOpacity>
          {/* STK PUSH REQUIRING PIN */}
        </View>
      )}
    </View>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
    padding: 10,
  },
});
