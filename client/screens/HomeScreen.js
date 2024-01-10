import { StyleSheet, Text, View, Image,TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { faBell,faChartPie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';

let userId = '659a6d9253fb33f5d4909b90';

const HomeScreen = () => {

  const navigation = useNavigation();
  
  const navigateToProfile = () => {
    navigation.navigate('Profile'); 
  };
  const navigateToWithdraw = () => {
    navigation.navigate('Withdraw'); 
  };
  const navigateToDeposit = () => {
    navigation.navigate('Deposit'); 
  };
  const [parent, setParent] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://172.16.55.197:5000/parent/${userId}`,{ timeout: 5000 });
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
<View>
      {/* top part contains user image links to account, notification and spending chart */}
  <View style={styles.container}>
<View style={styles.container}>
  {/* profile pic */}
   <TouchableOpacity style={styles.avatar} onPress={navigateToProfile}>
     <Image style={styles.image} source={require('../assets/avatar.png')} />
   </TouchableOpacity>
   {/* USER GREETINGS */}
   <View style={styles.userGreetings}>
      <Text>
         Hello {"\n"}{parent.personalInfo.name}
      </Text>
   </View>
</View>
<View>
<FontAwesomeIcon icon={ faBell } />
<FontAwesomeIcon icon={ faChartPie } />

</View>
  </View>
      {/* balance of user account */}
  <View>
  {parent.children.map((child, index) => (
        <View key={index}>
          <Text> Balance {"\n"}  {child.financialInformation.allowanceAmount}</Text>
        </View>
      ))}
  </View>
  {/* withdraw and deposit options */}
  <View style={styles.fundsTransfer}>
<TouchableOpacity style={styles.ButtonRed}onPress={navigateToDeposit} >
  <Text>Deposit</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.ButtonBlue} onPress={navigateToWithdraw} >
<Text>Withdraw</Text>
</TouchableOpacity>
  </View>
  {/* Transaction statement */}
  <View>
    <Text>Transaction Statement</Text>
    <Text>See all</Text>
  </View>
  <ScrollView>
    <View>
      <View>
        <Text>accountName</Text>
        <Text>accountNumber</Text>
      </View>
      <View>
        <Text>- KSH 20</Text>
        <Text>10 Jan 2024</Text>
      </View>
    </View>
  </ScrollView>
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
