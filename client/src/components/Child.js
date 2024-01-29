import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { faBell,faChartPie,faEyeSlash, faScroll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';


const Parent = () => {
let userId = '659a6d9253fb33f5d4909b90';

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
      const response = await axios.get(`http://172.16.54.69:5000/parent/${userId}`);
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
      await axios.patch(`http://172.16.55.0:5000/parent/${userId}`, editedData);

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
    <ScrollView>
    

      {/* Displaying child data */}
      {parent.children.map((child, index) => (
        <View key={index}>
          <Text>Child {index + 1}</Text>
          <Text>Child Full Name: {child.childFullName}</Text>
          <Text>Grade/Class: {child.gradeClass}</Text>
          <Text>Student ID: {child.studentID}</Text>
          <Text>Allowance Amount: {child.financialInformation.allowanceAmount}</Text>
          <Text>Allowance Frequency: {child.financialInformation.allowanceFrequency}</Text>
        </View>
      ))}
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

          {/* Form for editing child data */}
          {editedData.children.map((child, index) => (
            <View key={index}>
              <Text>Child {index + 1}</Text>
              <TextInput
                placeholder={`Child ${index + 1} Full Name`}
                value={child.childFullName}
                onChangeText={(text) => setEditedData({ ...editedData, children: editedData.children.map((c, i) => (i === index ? { ...c, childFullName: text } : c)) })}
              />
              <TextInput
                placeholder={`Child ${index + 1} Grade/Class`}
                value={child.gradeClass}
                onChangeText={(text) => setEditedData({ ...editedData, children: editedData.children.map((c, i) => (i === index ? { ...c, gradeClass: text } : c)) })}
              />
              <TextInput
                placeholder={`Child ${index + 1} Student ID`}
                value={child.studentID}
                onChangeText={(text) => setEditedData({ ...editedData, children: editedData.children.map((c, i) => (i === index ? { ...c, studentID: text } : c)) })}
              />
              <TextInput
                placeholder={`Child ${index + 1} Allowance Amount`}
                value={child.financialInformation.allowanceAmount.toString()}
                onChangeText={(text) => setEditedData({ ...editedData, children: editedData.children.map((c, i) => (i === index ? { ...c, financialInformation: { ...c.financialInformation, allowanceAmount: Number(text) } } : c)) })}
              />
              <TextInput
                placeholder={`Child ${index + 1} Allowance Frequency`}
                value={child.financialInformation.allowanceFrequency}
                onChangeText={(text) => setEditedData({ ...editedData, children: editedData.children.map((c, i) => (i === index ? { ...c, financialInformation: { ...c.financialInformation, allowanceFrequency: text } } : c)) })}
              />
            </View>
          ))}

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

export default ProfileScreen;
