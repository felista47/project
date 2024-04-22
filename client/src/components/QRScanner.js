import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [studentID, setStudentID] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Split the received data into student ID and user email
    const [receivedStudentID, receivedUserEmail] = data.split(',');
    setStudentID(receivedStudentID);
    setUserEmail(receivedUserEmail);
    console.log('scanned info',studentID,userEmail)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      {studentID !== '' && userEmail !== '' && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Student ID: {studentID}</Text>
          <Text style={styles.dataText}>User Email: {userEmail}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    // transform: [{ scaleY: -1 }], 
  },
  dataContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  dataText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QRScanner;
