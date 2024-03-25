import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import { faBell,faChartPie,faChildren,faGears,faQuestion, faScroll, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Parent = () => {
  const { userEmail } = useAuth();
  const [parentData, setParentData] = useState(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userEmail]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/parent/${userEmail}`, { timeout: 5000 });
      const parent = response.data;
      setParentData(parent);
      console.log(parentData)
    } catch (error) {
      console.error('Error fetching parent data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response =await axios.patch(`https://pocket-money.up.railway.app/parent/${userEmail}`, parentData);
      setEditable(false);
      console.log('data after update',response.data) // After update, switch back to view mode
    } catch (error) {
      console.error('Error updating parent data:', error);
    }
  };

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleCancelPress = () => {
    setParentData(parentData); // Reset to original data
    setEditable(false);
  };

  const handleInputChange = (field, value) => {
    let updatedParentData = { ...parentData };
  
    // Check if the field belongs to personalInfo or parentalDetails
    if (field in updatedParentData.personalInfo) {
      updatedParentData = {
        ...updatedParentData,
        personalInfo: {
          ...updatedParentData.personalInfo,
          [field]: value,
        },
      };
    } else if (field in updatedParentData.parentalDetails) {
      updatedParentData = {
        ...updatedParentData,
        parentalDetails: {
          ...updatedParentData.parentalDetails,
          [field]: value,
        },
      };
    }
    setParentData(updatedParentData);
  };
  

  const renderTextInput = (label, value, field) => {
    return (
      <View style={styles.inputContainer}>
        <Text>{label}</Text>
          <TextInput
            value={value}
            onChangeText={(text) => handleInputChange(field,text)}
            editable={editable}
            style={styles.textInput}
          />
      </View>
    );
  };
  


  if (!parentData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
<View style={styles.mainContainer}>
  <View style={styles.parentProfile}>
      <Image style={styles.image} source={require('../../assets/avatar.png')} />
      <TouchableOpacity ><Text style={styles.editImage}>Edit Image</Text></TouchableOpacity>
  </View>
  <View style={styles.parentData}>
    {renderTextInput('ID', parentData.personalInfo.id, 'id')}
    {renderTextInput('Name', parentData.personalInfo.name, 'name')}
    {renderTextInput('Phone Number', parentData.personalInfo.phoneNumber, 'phoneNumber')}
    {renderTextInput('Home Address', parentData.personalInfo.homeAddress, 'homeAddress')}
    {renderTextInput('Parent Relationship', parentData.parentalDetails.parentRelationship, 'parentRelationship')}
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
</View>
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

export default Parent;
