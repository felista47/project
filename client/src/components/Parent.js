import { StyleSheet, Text, View, TouchableOpacity,Image, Button,TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import {Picker} from '@react-native-picker/picker'


const Parent = () => {
  const {uid} = useAuth();
  const [parent, setParent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    personalInfo: {
      id:'',
      name: '',
      phoneNumber: '',
      homeAddress: '',
    },
    parentalDetails: {
      parentRelationship: '',
    },
    uid:''
  });
  const [parentData, setParentData] = useState({
    personalInfo: {
      id: '',
      name: '',
      phoneNumber: '',
      homeAddress: '',
    },
    parentalDetails: {
      parentRelationship: '',
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // console.log('user UID',uid)
      const response = await axios.get(`http://192.168.43.6:3000/parent/${uid}`);
      const parentData = response.data;
        setParent(parentData);
      setEditedData(parentData);
    } catch (error) {
      console.error('Error fetching parent data:', error);
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const updatedParentData = {
      ...parentData,
    };
    const requestData = {
      data: updatedParentData,
      uid: uid,

    };
    console.log(requestData)
    try {
      await axios.put(`http://192.168.43.6/parent/${uid}`, requestData);
   
    } catch (error) {
      console.error('Error adding parent data:', error);
    }
  };

  const handleSubmit = async () => {
    const updatedParentData = {
      ...parentData,
    };
    const requestData = {
      data: updatedParentData,
      uid: uid,

    };
    console.log(requestData)
    try {
      await axios.post(`http://192.168.43.6/parent/add-details`, requestData);
   
    } catch (error) {
      console.error('Error adding parent data:', error);
    }
  };
  const handleCancelPress = () => {
    // Reset editedData to current parent data
    setEditedData(parent);

    // Exit edit mode
    setIsEditing(false);
  };

  const handleInputChange = (key, value) => {
    setParentData({
      ...parentData,
      personalInfo: {
        ...parentData.personalInfo,
        [key]: value,
      },
    });
  };

  const handleRelationshipChange = (value) => {
    setParentData({
      ...parentData,
      parentalDetails: {
        parentRelationship: value,
      },
    });
  };



  if (!parent) {
    <View style={styles.mainContainer}>
    <TextInput
      placeholder="ID"
      onChangeText={(text) => handleInputChange('id', text)}
      value={parentData.personalInfo.id}
    />
    <TextInput
      placeholder="Name"
      onChangeText={(text) => handleInputChange('name', text)}
      value={parentData.personalInfo.name}
    />
    <TextInput
      placeholder="Phone Number"
      onChangeText={(text) => handleInputChange('phoneNumber', text)}
      value={parentData.personalInfo.phoneNumber}
    />
    <TextInput
      placeholder="Home Address"
      onChangeText={(text) => handleInputChange('homeAddress', text)}
      value={parentData.personalInfo.homeAddress}
    />
    <Picker
      selectedValue={parentData.parentalDetails.parentRelationship}
      onValueChange={(itemValue) => handleRelationshipChange(itemValue)}
    >
      <Picker.Item label="Select Relationship" value="" />
      <Picker.Item label="Father" value="Father" />
      <Picker.Item label="Mother" value="Mother" />
      <Picker.Item label="Guardian" value="Guardian" />
      {/* Add more relationship options as needed */}
    </Picker>
    <Button title="Submit" onPress={handleSubmit} />
    </View>  }
     else {
  return (
    <ScrollView style={styles.parentContainer}>      
            <View style={styles.accItem}>
              <Text>ID:</Text>
              <Text> {parent.userData.personalInfo.id}</Text>
            </View>
            <View style={styles.accItem}>
              <Text>Name: </Text>
              <Text>{parent.userData.personalInfo.name}</Text>
            </View>
            <View style={styles.accItem}>
              <Text>Phone Number:</Text>
              <Text>{parent.userData.personalInfo.phoneNumber}</Text>
            </View>
            <View style={styles.accItem}>
              <Text>Parental Relationship:</Text>
              <Text>{parent.userData.parentalDetails.parentRelationship}</Text>
            </View>
            <View style={styles.accItem}>   
              <Text>Home Address:</Text>
              <Text>{parent.userData.personalInfo.homeAddress}</Text>
            </View>

            {isEditing ? (
              <View>
              <TextInput
      placeholder="ID"
      onChangeText={(text) => handleInputChange('id', text)}
      value={parentData.personalInfo.id}
    />
    <TextInput
      placeholder="Name"
      onChangeText={(text) => handleInputChange('name', text)}
      value={parentData.personalInfo.name}
    />
    <TextInput
      placeholder="Phone Number"
      onChangeText={(text) => handleInputChange('phoneNumber', text)}
      value={parentData.personalInfo.phoneNumber}
    />
    <TextInput
      placeholder="Home Address"
      onChangeText={(text) => handleInputChange('homeAddress', text)}
      value={parentData.personalInfo.homeAddress}
    />
    <Picker
      selectedValue={parentData.parentalDetails.parentRelationship}
      onValueChange={(itemValue) => handleRelationshipChange(itemValue)}
    >
      <Picker.Item label="Select Relationship" value="" />
      <Picker.Item label="Father" value="Father" />
      <Picker.Item label="Mother" value="Mother" />
      <Picker.Item label="Guardian" value="Guardian" />
      {/* Add more relationship options as needed */}
    </Picker>
                <TouchableOpacity onPress={handleUpdate}>
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
            
}};


export default Parent;
const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:'#ECF6FC',
    paddingTop:30,
    marginBottom:30,
  },
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
