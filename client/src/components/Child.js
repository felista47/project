import { StyleSheet, Text, View, TouchableOpacity,Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { faBell,faChartPie,faEyeSlash, faScroll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import { useAuth } from '../context/AuthContext'


const Child = () => {
  const { accountType,userEmail} = useAuth();
  console.log('childInfo',accountType,userEmail)

  const [parent, setParent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
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
      const childData = response.data;

      setParent(childData);
      setEditedData(childData);
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
      const response = await axios.get(`https://pocket-money.up.railway.app/parent/${userEmail}`);

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
    <ScrollView style={styles.accItem}>
    

      {/* Displaying child data */}
      {parent.children.map((child, index) => (
        <View key={index}>
          <Text style={styles.accItem} >Child {index + 1}</Text>
          <Text style={styles.accItem}>Child Full Name: {child.childFullName}</Text>
          <Text style={styles.accItem}>Grade/Class: {child.gradeClass}</Text>
          <Text style={styles.accItem}>Student ID: {child.studentID}</Text>
          <Text style={styles.accItem}>Allowance Amount: {child.financialInformation.allowanceAmount}</Text>
          <Text style={styles.accItem}>Allowance Frequency: {child.financialInformation.allowanceFrequency}</Text>
        </View>
      ))}
      {isEditing ? (
        <View>          
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

export default Child;
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