import { StyleSheet, Text, View, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'


const Child = () => {
    const { userEmail} = useAuth();
    const [children, setChildren] = useState([]);
    const [isEditingChild, setIsEditingChild] = useState(false);
    const [editingChild, setEditingChild] = useState(null);
    const [newChild, setNewChild] = useState({
      childFullName: '',
      gradeClass: '',
      studentID: '',
    });

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pocket-money.up.railway.app/parent/${userEmail}`);
        const parentData = response.data;
        setChildren(parentData.children);
      } catch (error) {
        console.error('Error fetching parents children data:', error);
      }
    };

    const handleInputChange = (name, value) => {
      setNewChild({ ...newChild, [name]: value }); // Update specific property in newChild object
    };

    const handleSubmitNewChild = async () => {
      try {
        const updatedChildren = [...children, newChild];
        console.log('Request Body:', { children: updatedChildren });
        const response = await axios.patch(
          `https://pocket-money.up.railway.app/parent/${userEmail}`,
          { children: updatedChildren }
        );
    
        if (response.status === 200) {
          console.log('New child added successfully!');
          const parentData = response.data;
          setChildren(parentData.children);
          setNewChild({ childFullName: '', gradeClass: '', studentID: '' });
        } else {
          console.error('Error adding child:', response.data);
        }
      } catch (error) {
        console.error('Error adding child:', error);
      }
    };
        
    const handleDeletePress = async (childId) => {
      console.log('child id',childId)
      try {
        // Call deleteChild with the childId
        await deleteChild(childId);
      } catch (error) {
        console.error('Error handling child press:', error);
      }
    }
    const deleteChild = async (childId) => {
    try {
      console.log("before delete requesst",userEmail,childId)
      const response = await axios.delete(`https://pocket-money.up.railway.app/parent/${userEmail}/children/${childId}`);
        if (response.status === 200) {
        console.log('Child deleted successfully');
        await fetchData();
      } else {
        console.log('Error deleting child: delete end point', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting child catch err:', error.message);
    }
    };
    const handleEditChild = (child) => {
      setIsEditingChild(true);
      setEditingChild(child);
    };
  

 return (
    <ScrollView style={styles.accItem}>
        {children.length > 0 ? (
           <>
        {children.map((child, index) => (
          <TouchableOpacity key={index}>
            <Text style={styles.accItem}>Child {index + 1}</Text>
            <Text style={styles.accItem}>Child Full Name: {child.childFullName}</Text>
            <Text style={styles.accItem}>Grade/Class: {child.gradeClass}</Text>
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
              <>
              <TextInput
                editable={true}
                placeholder="Full Name"
                // value={editingChild.childFullName}
                onChangeText={(text) => handleInputChange('childFullName', text)}
              />
              <TextInput
                placeholder="Grade/Class"
                value={editingChild.gradeClass}
                onChangeText={(text) => handleInputChange('gradeClass', text)}
              />
                 <TextInput
                placeholder="student ID"
                // value={editingChild.studentID}
                onChangeText={(text) => handleInputChange('StudentID', text)}
              />

              <TouchableOpacity onPress={() => handleSubmitNewChild(editingChild)}>
                <Text>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditingChild(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              </>
          )}

           </>
        ) : (
           <>
           {/* Form for adding a child */}
             <TextInput placeholder="Full Name" value={newChild.childFullName} onChangeText={(text) => handleInputChange('childFullName', text)}/>
             <TextInput placeholder="Grade/Class" value={newChild.gradeClass} onChangeText={(text) => handleInputChange('gradeClass', text)}/>
             <TextInput placeholder="Student ID" value={newChild.studentID} onChangeText={(text) => handleInputChange('studentID', text)}/>
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