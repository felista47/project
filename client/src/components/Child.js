import { StyleSheet, Text, View, TouchableOpacity,TextInput,Image, ScrollView,Pressable,KeyboardAvoidingView} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from 'react-native-root-toast';
import QRCode from 'react-native-qrcode-svg'


const Child = () => {
 const {userEmail} = useAuth();
 const navigation = useNavigation();
 const[studentData, setStudentData] =useState(null)
 const [editable, setEditable] = useState(false);
 const [QR, setQR] = useState("");
 const [QRref, setQRref] = useState();
 const [hasPermissions, setHasPermissions] = useState(false);
const [newStudent,setNewStudent]=useState({
  parent:userEmail,
  studentID: '',
  childFullName: '',
  gradeClass:'',
});
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
  
  const generateQRCode = (studentID) => {
      const dataToEmbed = `${studentID},${userEmail}`; // Concatenate student ID and user email
      setQR(dataToEmbed);
      console.log('Data before QR:', dataToEmbed);
  };
    
  
    useEffect(()=>{
      (async ()=>{ setHasPermissions((await MediaLibrary.requestPermissionsAsync()).granted) })()
    }, [])
  
    const saveQRCode = ()=>{
      if(!hasPermissions || !QRref) return
  
      QRref.toDataURL(async data =>{
        const QRCodeImg = FileSystem.documentDirectory + "QRCode.png";
        await FileSystem.writeAsStringAsync(QRCodeImg, data, { encoding: FileSystem.EncodingType.Base64 })
        MediaLibrary.saveToLibraryAsync(QRCodeImg)
        .then(()=> Toast.show("QR Code saved to gallery", Toast.durations.LONG))
        .catch(console.error)
      })
    }

    const toggleEdit = () => {
      setEditable(!editable);
    };
 
    const handleUpdate = async (studentID) => {
      console.log('Data before update:', studentData);
      try {
        const response = await axios.put(`https://pocket-money.up.railway.app/student/${studentID}`, studentData);
        setEditable(false);
        console.log('Data after update:', response.data);
      } catch (error) {
        console.error('Error updating student data:', error);
      }
    };
    const handleNewstudent = async() =>{
      try {
        const response = await axios.post(`https://pocket-money.up.railway.app/student/`, newStudent);
        setEditable(false);
        console.log('Data after adding:', response.data);
        fetchData();
      } catch (error) {
        console.error('Error adding new student', error);
      }
    }
    const handleCancelPress = () => {
      setStudentData(studentData); // Reset to original data
      setEditable(false);
    };
    const handleInputChange = (field, value) => {
      let updatedStudentData = [...studentData];
      const studentIndex = updatedStudentData.findIndex(student => student.studentID === studentData[0].studentID);
      if (studentIndex !== -1) {
        updatedStudentData[studentIndex] = {
          ...updatedStudentData[studentIndex],
          [field]: value,
        };
        setStudentData(updatedStudentData);
      }
    }; 
    const renderTextInput = (label, value, field) => {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          <Text>{label}</Text>
            <TextInput
              value={value}
              onChangeText={(text) => handleInputChange(field,text)}
              editable={editable}
              style={styles.textInput}
            />
        </KeyboardAvoidingView>
      );
    };

   

    
    if (!studentData) {
      return (
        
        <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
 <View style={styles.studentProfile}>
      <Image style={styles.image} source={require('../../assets/avatar.png')} />
      <TouchableOpacity ><Text style={styles.editImage}>Edit Image</Text></TouchableOpacity>
  </View>
  
        <View style={styles.studentData}>
 <TextInput
              style={styles.textInput}
              placeholder="Student ID"
              onChangeText={(text) =>setNewStudent({ ...newStudent,studentID:text })}/>
      <TextInput
              style={styles.textInput}
              placeholder="Child Full Name"
              onChangeText={(text) =>setNewStudent({ ...newStudent,childFullName:text })}
        />
      <TextInput
              style={styles.textInput}
              placeholder="Grade/Class"
              onChangeText={(text) =>setNewStudent({ ...newStudent,gradeClass:text })}
      />
        <TouchableOpacity style={styles.button} onPress={() => handleNewstudent()}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Add Student</Text>
    </TouchableOpacity>
       </View>
       </KeyboardAvoidingView>

      );
    }

 return (
<ScrollView behavior="padding" style={styles.mainContainer}>
  <View style={styles.studentProfile}>
      <Image style={styles.image} source={require('../../assets/avatar.png')} />
      <TouchableOpacity ><Text style={styles.editImage}>Edit Image</Text></TouchableOpacity>
  </View>
  
  <View style={styles.studentData}>
      {renderTextInput('ID:', studentData[0].studentID, 'studentID')}
      {renderTextInput('Name', studentData[0].childFullName, 'childFullName')}
      {renderTextInput('Grade', studentData[0].gradeClass, 'gradeClass')}
      {renderTextInput('Allowance Limit', studentData[0].AllowanceLimit.toString(), 'AllowanceLimit')}
      <TouchableOpacity style={styles.inputContainer} onPress={() => generateQRCode(studentData[0].studentID)}>
           <Text>GEnerate Qr Code</Text>
        </TouchableOpacity> 
        
         </View>

  <ScrollView style={styles.qr}>
        <Pressable onPress={saveQRCode}>
          { QR && <QRCode size={240} value={QR} getRef={setQRref} backgroundColor="#fff"/> }
        </Pressable>
  </ScrollView>
      { QR && <Text style={styles.instraction}>Click The <Text style={styles.instraicon}>QR</Text> Code to save it</Text> }
  <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={editable ? () => handleUpdate(studentData[0].studentID) : toggleEdit}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{editable ? 'Save' : 'Edit'}</Text>
    </TouchableOpacity>
    {editable && (
      <TouchableOpacity style={styles.buttonOne} onPress={handleCancelPress}>
        <Text  style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
      </TouchableOpacity>
    )}
  </View>

 </ScrollView>
  );
};

export default Child;

const styles = StyleSheet.create({

  mainContainer: {
    padding: '5%',
    backgroundColor: "#e0f2f1",
    flex: 1,
    paddingBottom:'10%',
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
  
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  qr:{
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 250,
    width: 250,
    marginTop:'-10%', // Add some bottom margin

  },

  instraction:{
    color: "#adadad"
  },

  instraicon:{
    color: "#bf88f3"
  },
});