import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { faBell,faChartPie,faEyeSlash, faScroll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


const Parent = () => {
  const route = useRoute();
  const { accountType,userEmail } = route.params;
  console.log('parentInfo',accountType,userEmail)
  const [parent, setParent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    personalInfo: {
      name: '',
      contactInfo: {
        phoneNumber: '',
        emailAddress: '',
      },
      homeAddress: '',
    },
    parentalDetails: {
      parentRelationship: '',
    },
    children: [],
    financialInformation: {
      allowanceBalAmount: 0,
      allowanceAmount: 0,
      allowanceFrequency: 'Weekly',
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
        <Text>{parent.personalInfo.contactInfo.phoneNumber}</Text>
      </View>
      <View style={styles.accItem}>
        <Text>Email Address: </Text>
        <Text>{parent.personalInfo.contactInfo.emailAddress}</Text>
      </View>
      <View style={styles.accItem}>   
        <Text>Home Address:</Text>
        <Text>{parent.personalInfo.homeAddress}</Text>
      </View>

      {isEditing ? (
        <View>
          {/* Form for editing parent data */}
          <TextInput
            placeholder="Name"
            value={editedData.personalInfo.name}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo, name: text } })}
          />
          <TextInput
            placeholder="Phone Number"
            value={editedData.personalInfo.contactInfo.phoneNumber}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo, contactInfo: { ...editedData.personalInfo.contactInfo, phoneNumber: text } } })}
          />
          <TextInput
            placeholder="Email Address"
            value={editedData.personalInfo.contactInfo.emailAddress}
            onChangeText={(text) => setEditedData({ ...editedData, personalInfo: { ...editedData.personalInfo, contactInfo: { ...editedData.personalInfo.contactInfo, emailAddress: text } } })}
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
        <TouchableOpacity onPress={handleEditPress}>
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

})
