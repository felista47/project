import { StyleSheet, Text, View, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'


const Child = () => {
    const { uid} = useAuth();
    const [isEditingChild, setIsEditingChild] = useState(false);
    const [editingChild, setEditingChild] = useState(null);
    const [children, setChildren] = useState([]);
    const [newChild, setNewChild] = useState({
        Name: '',
        Grade: '',
        studentID: '',
        frequency: '',
        limit: 0,
        balance: 0
    });

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        console.log(uid)
        const response = await axios.get(`http://172.16.120.106:3000/student//${uid}`);
        const parentData = response.data;
        setChildren(parentData);
        console.error('children data:',parentData);
      } catch (error) {
        console.error('Error fetching parents children data:', error);
      }
    };

    const handleInputChange = (name, value) => {
      setNewChild({ ...newChild, [name]: value }); 
    };
    

    const handleSubmitNewChild = async () => {

      try{  
        const requestData = {
          data: newChild,
          uid: uid,
    
        };
          console.log('child',requestData);
       
        const response = await axios.post(`http://172.16.120.106:3000/student`,requestData);
    
        if (response.status === 200) {
          console.log('New child added successfully!');
          const parentData = response.data;
          setChildren(parentData);
          setNewChild({
            Name: '',
            Grade: '',
            studentID:'',
            frequency: '',
            limit: 0,
            balance: 0
        });
         } else {
          console.error('Error adding child:', response.data);
     }
      } catch (error) {
        console.error('Error adding child:', error);
      }
    };

    const handleEditChild = (child) => {
      setIsEditingChild(true);
      setEditingChild(child);
    };
    const handleDeletePress = async () => {
      try {
        const response = await axios.delete(`http://172.16.120.106:3000/student/${uid}`);
        const parentData = response.data;
        setChildren(parentData);
        console.error('children data:',parentData);
      } catch (error) {
        console.error('Error fetching parents children data:', error);
      }
    };

 return (
    <ScrollView style={styles.accItem}>
        {children.length > 0 ? (
           <>
        {children.map((child, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.accItem}>Child {index + 1}</Text>
            <Text style={styles.accItem}>Child Full Name: {child.Name}</Text>
            <Text style={styles.accItem}>Grade/Class: {child.Grade}</Text>
            <Text style={styles.accItem}>Student ID: {child.studentID}</Text>
            <View>
            <TouchableOpacity onPress={() => handleDeletePress(child._id)}><Text>Delete</Text></TouchableOpacity>
            {isEditingChild !== child._id && ( // Check if not already editing this child
              <TouchableOpacity onPress={() => handleEditChild(child)}>
                <Text>Edit</Text>
              </TouchableOpacity>)}
            </View>
          </TouchableOpacity>
          ))}
          {isEditingChild && (
            <></>
              // <>
              // <TextInput
              //   editable={true}
              //   placeholder="Full Name"
              //   value={editingChild.childFullName}
              //   onChangeText={(text) => handleInputChange('Name', text)}
              // />
              // <TextInput
              //   placeholder="Grade"
              //   value={editingChild.gradeClass}
              //   onChangeText={(text) => handleInputChange('Grade', text)}
              // />
             

              // <TouchableOpacity onPress={() => handleSubmitNewChild(editingChild)}>
              //   <Text>Save Changes</Text>
              // </TouchableOpacity>
              // <TouchableOpacity onPress={() => setIsEditingChild(false)}>
              //   <Text>Cancel</Text>
              // </TouchableOpacity>
              // </>
          )}

           </>
        ) : (
           <>
           {/* Form for adding a child */}
             <TextInput placeholder="Full Name" value={newChild.Name} onChangeText={(text) => handleInputChange('Name', text)}/>
             <TextInput placeholder="Grade/Class" value={newChild.Grade} onChangeText={(text) => handleInputChange('Grade', text)}/>
             <TextInput placeholder="StudentID" value={newChild.studentID} onChangeText={(text) => handleInputChange('studentID', text)}/>
             <TextInput placeholder="Allowance frequency" value={newChild.frequency} onChangeText={(text) => handleInputChange('frequency', text)}/>
             <TextInput placeholder="allawonce limit"
               keyboardType="numeric"
               value={newChild.limit}
               onChangeText={(text) => handleInputChange('limit',text )}/>
             <TouchableOpacity onPress={handleSubmitNewChild}><Text>Add Child</Text></TouchableOpacity>
           </>
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