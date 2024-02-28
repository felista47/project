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
    personalInfo: {
      name: '',
      phoneNumber: '',
      homeAddress: '',
    },
    parentalDetails: {
      parentRelationship: '',
    },
    userAccountInfo:{
      email: ''
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
        <Text>ID:</Text>
        <Text> {parent.personalInfo.id}</Text>
      </View>
      <View style={styles.accItem}>
        <Text>Name: </Text>
        <Text>{parent.personalInfo.name}</Text>
      </View>
      <View style={styles.accItem}>
        <Text>Phone Number:</Text>
        <Text>{parent.personalInfo.phoneNumber}</Text>
      </View>
      <View style={styles.accItem}>
        <Text>Parental Relationship:</Text>
        <Text>{parent.parentalDetails.parentRelationship}</Text>
      </View>
      <View style={styles.accItem}>
        <Text>Email Address: </Text>
        <Text>{parent.userAccountInfo.email}</Text>
      </View>
      <View style={styles.accItem}>   
        <Text>Home Address:</Text>
        <Text>{parent.personalInfo.homeAddress}</Text>
      </View>

      {isEditing ? (
        <View>
          {/* Form for editing parent data */}
          <TextInput
            placeholder="ID"
            value={editedData.personalInfo.id}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo, id: text } })}
          />
          <TextInput
            placeholder="Name"
            value={editedData.personalInfo.name}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo, name: text } })}
          />
             <TextInput
            placeholder="Parental Relationship"
            value={editedData.parentalDetails.parentRelationship}
            onChangeText={(text) => setEditedData({ ...editedData, parentalDetails: { ...editedData.parentalDetails, parentRelationship: text } })}
          />
          <TextInput
            placeholder="Phone Number"
            value={editedData.personalInfo.phoneNumber}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo, phoneNumber: text }  })}
          />
          <TextInput
            placeholder="Email Address"
            value={editedData.userAccountInfo.email}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.userAccountInfo, email: text } })}
          />
          <TextInput
            placeholder="Home Address"
            value={editedData.personalInfo.homeAddress}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo, homeAddress: text } })}
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
