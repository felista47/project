import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput,KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Vendor = () => {
  const { userEmail } = useAuth();
  const [vendorData, setVendorData] = useState(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userEmail]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/vendor/${userEmail}`,{ timeout: 5000 });
      const vendor = response.data;
      setVendorData(vendor); 
       } 
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response =await axios.put(`https://pocket-money.up.railway.app/vendor/${userEmail}`, vendorData);
      setEditable(false);
      const vendor =response.data
      setVendorData(vendor);
      console.log('data after update',response.data)
    } catch (error) {
      console.error('Error updating vendor data:', error);
    }
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleCancelPress = () => {
    setVendorData(vendorData); // Reset to original data
    setEditable(false);
  };

  const handleInputChange = (field, value) => {
    let updatedVendorData = { ...vendorData};
      if (field in updatedVendorData.personalInfo) {
      updatedVendorData = {
        ...updatedVendorData,
        personalInfo: {
          ...updatedVendorData.personalInfo,
          [field]: value,
        },
      };
    }
    setVendorData(updatedVendorData);
  };
 
  
  const renderTextInput = (label, value, field) => {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
        <Text>{label}</Text>
          <TextInput
            value={value}
            onChangeText={(text) => handleInputChange(field,text)}
            editable={editable}
            style={styles.textInput}
          />
      </KeyboardAvoidingView>
    );
  };
  


  if (!vendorData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
      <View style={styles.parentProfile}>
          <Image style={styles.image} source={require('../../assets/avatar.png')} />
          <TouchableOpacity ><Text style={styles.editImage}>Edit Image</Text></TouchableOpacity>
      </View>
      <View style={styles.parentData}>
        {renderTextInput('ID', vendorData.personalInfo.id, 'id')}
        {renderTextInput('Name', vendorData.personalInfo.name, 'name')}
        {renderTextInput('Phone Number', vendorData.personalInfo.phoneNumber, 'phoneNumber')}
        {renderTextInput('Home Address', vendorData.personalInfo.homeAddress, 'homeAddress')}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={editable ? handleUpdate : toggleEdit}>
          <Text style={{ color: 'white', textAlign: 'center' }}>{editable ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
        {editable && (
          <TouchableOpacity style={styles.buttonOne} onPress={handleCancelPress}>
            <Text  style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
    )}
const styles = StyleSheet.create({
  mainContainer: {
    padding: '5%',
    backgroundColor: "#e0f2f1",
    flex: 1,
  },
  parentProfile:{
    padding:'5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImage:{
    padding:'2%',
color:'#58C2FA',
fontWeight:'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distribute buttons evenly
    marginBottom: 20, // Add some bottom margin
  },
  inputContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    height: '10%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: '5%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#2ECC71',
    width: 150,
    alignSelf: 'center',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
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
  textInput: {
    
    color:'black',
  
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
    

export default Vendor

