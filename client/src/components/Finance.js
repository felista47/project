import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { faBell,faChartPie,faEyeSlash, faScroll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import { useAuth } from '../context/AuthContext'


const Parent = () => {
  const {userEmail} = useAuth();
  const [parent, setParent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    financialInformation: {
    allowanceFrequency:""
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/parent/${userEmail}`);
      const parentData = response.data;

      setParent(parentData);
      setEditedData(parentData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    try {
      // Make API request to update user data
      await axios.patch(`https://pocket-money.up.railway.app/parent/${userEmail}`, editedData);

      // Update local state with edited data
      setParent(editedData);

      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  const handleCancelPress = () => {
    // Reset editedData to current parent data
    setEditedData(parent);

    // Exit edit mode
    setIsEditing(false);
  };

  if (!parent) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView style={styles.parentContainer}>
      <View style={styles.accItem}>
        <Text>{parent.financialInformation.allowanceFrequency} Allowance Amount</Text>
        <Text> {parent.financialInformation.allowanceAmount}</Text>
      </View>
      <View style={styles.accItem}>
        <Text>Allowance Balance Amount </Text>
        <Text> {parent.financialInformation.allowanceBalAmount}</Text>
      </View>
      <View style={styles.accItem}>
        <Text>Allowance Frequency:</Text>
        <Text> {parent.financialInformation.allowanceFrequency}</Text>
      </View>
  
      {isEditing ? (
        <View>
          {/* Form for editing finance data */}
          <TextInput
            placeholder="ID"
            value={editedData.financialInformation.allowanceFrequency}
            onChangeText={(text) => setEditedData({ ...editedData, financialInformation: { ...editedData.financialInformation, allowanceFrequency: text } })}
          />

  
   
       


          <TouchableOpacity onPress={handleSavePress}>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelPress}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.ButtonBlue}onPress={handleEditPress}>
          <Text>Edit</Text>
        </TouchableOpacity>
      )}
  
    </ScrollView>
  );
};


export default Parent;
const styles = StyleSheet.create({
  accItem:{
    width:'95%',
    elevation:2,
    height:100,
    padding:20,
    marginBottom:15,
    borderRadius:10,
    backgroundColor:'white',
    alignSelf:'center',
  },
  accItemIcon:{
    backgroundColor:'#58C2FD',
    alignItems:'center',
    paddingTop:10,
    width:40,
    height:40,
    borderRadius:999,
    marginLeft:20,
    marginRight:30,
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

})
