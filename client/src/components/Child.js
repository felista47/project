import { StyleSheet, Text, View, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'


const Child = () => {
  const { userEmail} = useAuth();
  const [parent, setParent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [children, setChildren] = useState({
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
      console.log(parentData)
      setParent(parentData)
      setChildren(parentData.children); // Set children state with fetched data
    } catch (error) {
      console.error('Error fetching parents children data:', error);
    }
  };
  const handleEditPress = () => {
    setIsEditing(true); 
  };

  const handleSavePress = async () => {
    try {
      // Make API request to update user data
      const dataToSend = { children: [children] };

    console.log('child info',dataToSend)
    const response = await axios.patch(`https://pocket-money.up.railway.app/parent/${userEmail}`, dataToSend);

      // Update local state with edited data
      const parentData = response.data;
      setChildren(parentData.children); // Set children state with fetched data
      if (response.status === 200) {
        setParent({ ...parent, children }); // Update local parent state
      } else {
        console.error('Error updating child data:', response.data.error);
      }

      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating user child data:', error);
    }
  };

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
  
  const handleCancelPress = () => {
    setIsEditing(false);
  };

  const handleChildPress = async (childId) => {
    console.log('child id',childId)
    try {
      // Call deleteChild with the childId
      await deleteChild(childId);
    } catch (error) {
      console.error('Error handling child press:', error);
    }
}
  
const handleInputChange = (field, value, childId) => {
  setChildren((prevChildren) =>
    prevChildren.map((child) =>
      child._id === childId ? { ...child, [field]: value } : child
    )
  );
};


if (!parent) {
  return <Text>Loading...</Text>;
}


  return (
    <ScrollView style={styles.accItem}>

      {children.length > 0 ? (
      <>
      {children.map((child, index) => (
       <TouchableOpacity key={index}>
          <Text style={styles.accItem} >Child {index + 1}</Text>
          <Text style={styles.accItem}>Child Full Id: {child._id}</Text>
          <Text style={styles.accItem}>Child Full Name: {child.childFullName}</Text>
          <Text style={styles.accItem}>Grade/Class: {child.gradeClass}</Text>
          <Text style={styles.accItem}>Student ID: {child.studentID}</Text> 
          <TouchableOpacity style={styles.ButtonBlue} onPress={() => handleChildPress(child._id)}><Text>Delete</Text></TouchableOpacity>

        </TouchableOpacity>
      ))}
      {isEditing ? (
        <>          
           <TextInput
          style={styles.input}
          placeholder={`Child Full Name`}
          // value={child.childFullName}
          onChangeText={(text) => handleInputChange( 'childFullName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={`Grade/Class`}
          // value={child.gradeClass}
          onChangeText={(text) => handleInputChange( 'gradeClass', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={`Child Student ID`}
          // value={child.studentID}
          onChangeText={(text) => handleInputChange('studentID', text)}
        />

          <TouchableOpacity onPress={handleSavePress}>
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelPress}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={handleEditPress}>
          <Text>Edit</Text>
        </TouchableOpacity>
      )}
       </>
    ) : (
      <>
    {/* Form for adding a child */}
    <TextInput
            placeholder="Full Name"
            value={children.childFullName}
            onChangeText={(text) => handleInputChange('childFullName', text)}
          />
          <TextInput
            placeholder="Grade/Class"
            value={children.gradeClass}
            onChangeText={(text) => handleInputChange('gradeClass', text)}
          />
          <TextInput
            placeholder="Student ID"
            value={children.studentID}
            onChangeText={(text) => handleInputChange('studentID', text)}
          />

<TouchableOpacity onPress={handleSavePress}>
      <Text>Add Child</Text></TouchableOpacity>
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