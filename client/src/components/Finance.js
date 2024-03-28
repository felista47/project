import { StyleSheet, Text, View, TouchableOpacity,TextInput,Image, ScrollView } from 'react-native';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'


const Finance = ({navigation}) => {
 const {userEmail} = useAuth();
 const[studentData, setStudentData] =useState(null)
 const [editable, setEditable] = useState(false);

 useEffect(() => {
      fetchData();
    }, [userEmail]);

    const fetchData = async () => {
      try {
        const response =await axios.get(`https://pocket-money.up.railway.app/student/parent/${userEmail}`);
        const student = response.data;
        setStudentData(student);
        console.log('children data:',studentData);
      } catch (error) {
        console.error('Error fetching parents children data:', error);
      }
    };

    const toggleEdit = () => {
      setEditable(!editable);
    };
  
    const handleUpdate = async (studentID) => {
      try {
        const response = await axios.put(`https://pocket-money.up.railway.app/student/${studentID}`, studentData);
        setEditable(false);
        console.log('Data after update:', response.data);
      } catch (error) {
        console.error('Error updating student data:', error);
      }
    };

    const handleInputChange = (field, value) => {
      const updatedStudentData = [...studentData];
      // Assuming each student has an _id field
      const studentIndex = updatedStudentData.findIndex(student => student.studentID === studentData[0].studentID);
      // If the studentIndex is found
      if (studentIndex !== -1) {
        updatedStudentData[studentIndex] = {
          ...updatedStudentData[studentIndex],
          [field]: value,
        };
        setStudentData(updatedStudentData); // Update studentData state with the new value
      }
    };
    
  
    const renderTextInput = (label, value, field) => {
      return (
        <View style={styles.inputContainerBal}>
          <Text>{label}</Text>
            <TextInput
              value={value}
              onChangeText={(text) => handleInputChange(field, text)}
              editable={editable}
              style={styles.textInput}
            />
      <TouchableOpacity style={styles.button} onPress={editable ? () => handleUpdate(studentData[0].studentID) : toggleEdit}>
      <FontAwesomeIcon icon={faEdit} style={{ color: 'white' }} />
      </TouchableOpacity>
        </View>
      );
    };
    
    if (!studentData) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }

 return (
<View style={styles.mainContainer}>
  <View style={styles.studentProfile}>
      <Image style={styles.image} source={require('../../assets/avatar.png')} />
      <TouchableOpacity ><Text style={styles.editImage}>Edit Image</Text></TouchableOpacity>
  </View>
  <View style={styles.studentData}>

    <View style={styles.inputContainerBal}>
      <Text>NAME: {studentData[0].childFullName}</Text>
    </View>

    <View style={styles.inputContainerBal}>
      <Text>Balance: KSH. {studentData[0].BalAmount}</Text>
      <TouchableOpacity style={styles.buttonBalDep} onPress={()=>navigation.navigate('Deposit')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Deposit</Text></TouchableOpacity>
    </View>
    {renderTextInput('Allowance Limit: ', studentData[0].AllowanceLimit.toString(), 'AllowanceLimit')}
   
      {renderTextInput('Allowance Frequency', studentData[0].Frequency, 'Frequency')}

  </View>

  

 </View>
  );
};

export default Finance;

const styles = StyleSheet.create({
  mainContainer: {
    padding: '5%',
    backgroundColor: "#e0f2f1",
    flex: 1,
  },
  studentProfile:{
    padding:'5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
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
  inputContainerBal: {
    marginTop: '10%',
    flexDirection: 'row',
    height: '10%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: '5%',
    justifyContent:'space-between'
  },
  buttonBalDep:{
    borderRadius: 10,
    backgroundColor: '#58C2FA',
    width: 100,
    height: '90%',
    padding:'2%',
    alignSelf: 'center',
    elevation: 8, 
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
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
    // paddingHorizontal: 10,
    // paddingVertical: 5,
  },
});