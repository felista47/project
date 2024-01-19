import { StyleSheet, Text, View, Image,TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { faBell,faChartPie,faEyeSlash, faScroll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import CategoryComponet from '../components/CategoryComponet';

const VendorHomeScreen = ({navigation}) => {

  let userId = '659a6c6e53fb33f5d4909b8d';

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []); 
  //fetch parent data function
  const [parent, setParent] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://172.16.55.62:5000/parent/${userId}`,{ timeout: 5000 });
      const parentData = response.data;
      setParent(parentData); 
       } 
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (!parent) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
       <View style={styles.containerOne}>
            <View style={styles.containerProfile}>
              {/* profile pic */}
              <TouchableOpacity style={styles.avatar} onPress={()=>navigation.navigate('Profile')}>
                <Image style={styles.image} source={require('../assets/avatar.png')} />
              </TouchableOpacity>
              {/* USER GREETINGS */}
              <View style={styles.userGreetings}>
                  <Text style={styles.greetingText}>{greeting},</Text>
                  <Text style={styles.text}>{parent.personalInfo.name}</Text>
              </View>
            </View>
            <View style={styles.containerIcons}>
              <FontAwesomeIcon icon={ faBell } />
              <FontAwesomeIcon icon={ faChartPie } />
            </View>
       </View>
      <CategoryComponet/>
      <TouchableOpacity style={styles.buttonOne} onPress={()=>navigation.navigate('AddProduct')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Add Product</Text>
    </TouchableOpacity>
      </View>
  );
  }
  export default VendorHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : "#ECF6FC",
    marginBottom:100,
  },
    containerOne: {
      paddingTop:40,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerProfile:{
      padding:10,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 999,
    },
    userGreetings: {
      marginLeft: 20,
    },
   
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    containerIcons:{
      flexDirection:'row',
      justifyContent:'space-evenly',
      width:'50%'
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
});


