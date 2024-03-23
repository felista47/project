import React, { useState, useEffect } from 'react';
import { Alert, View, Button, TextInput } from 'react-native';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const [number, setNumber] = useState('');
  const targetAmount = 100; // Set the target amount here

  useEffect(() => {
    // Initialize PushNotification
    PushNotification.configure({
      onNotification: function (notification) {
        // Handle notification
        Alert.alert('Notification', notification.message);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Clean up
    return () => {
      PushNotification.unregister();
    };
  }, []);

  const handleNumberChange = (text) => {
    setNumber(text);
  };

  const handleCheckNumber = () => {
    const enteredNumber = parseFloat(number);
    if (!isNaN(enteredNumber) && enteredNumber >= targetAmount) {
      // Trigger push notification
      PushNotification.localNotification({
        title: 'Target Reached',
        message: `The number has reached ${targetAmount}`,
      });
    } else {
      Alert.alert('Info', 'Number is not enough to trigger notification.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
        placeholder="Enter a number"
        onChangeText={handleNumberChange}
        value={number}
        keyboardType="numeric"
      />
      <Button title="Check Number" onPress={handleCheckNumber} />
    </View>
  );
};

export default App;
