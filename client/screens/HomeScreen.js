import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

let userId = '659a637c53a67e4a9f7593e9';

const HomeScreen = () => {

  const navigation = useNavigation();
  
  const navigateToProfile = () => {
    navigation.navigate('Profile'); 
  };

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://172.16.54.120:5000/parent/${userId}`);
      const userData = response.data;

      // Assuming "name" is directly under "personalInfo"
      const name = userData.personalInfo.name;

      setUserName(name);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (!userName) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.userGreetings}>
          <Text>
            Hello {"\n"} 
            {userName}
          </Text>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={navigateToProfile}>
          <Image style={styles.image} source={require('../assets/avatar.png')} />
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  userGreetings: {
    marginRight: 20,
  },
  avatar: {
    marginLeft: 20,
  },
});
