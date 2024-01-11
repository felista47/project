import { StyleSheet, Text, View, Image,TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { faBell,faChartPie,faEyeSlash, faScroll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';

let userId = '659a6c6e53fb33f5d4909b8d';

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
  //greetings function
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
      const response = await axios.get(`http://172.16.55.0:5000/parent/${userId}`,{ timeout: 5000 });
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
<View style={styles.mainContainer}>
      {/* top part contains user image links to account, notification and spending chart */}
  <View style={styles.containerOne}>
<View style={styles.containerProfile}>
  {/* profile pic */}
   <TouchableOpacity style={styles.avatar} onPress={navigateToProfile}>
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
      {/* balance of user account */}
  <View style={styles.containerTwo}>
  {parent.children.map((child, index) => (
        <View key={index} >
          <Text> Balance</Text>
          <Text style={styles.containerTwoText}>KSH.{child.financialInformation.allowanceAmount}  <FontAwesomeIcon icon={ faEyeSlash }/></Text>
        </View>
      ))}
  </View>
  {/* withdraw and deposit options */}
  <View style={styles.containerThree}>
<TouchableOpacity style={styles.ButtonBlue}onPress={navigateToDeposit} >
  <Text style={styles.buttonText}>Deposit</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.ButtonRed} onPress={navigateToWithdraw} >
<Text style={styles.buttonText}>Withdraw</Text>
</TouchableOpacity>
  </View>
  {/* Transaction statement */}
  <View style={styles.containerFour}>
    <Text style={styles.containerFourT1}>TRANSACTION STATEMENT</Text>
    <Text style={styles.containerFourT2}>See all</Text>
  </View>
  {/* Transaction statement item */}
  <ScrollView style={styles.containerFive}>
    <View style={styles.transactionItem}>
      <View  style={styles.transactionItemIcon} >
      <FontAwesomeIcon icon={ faScroll }/>
      </View>
      <View>
        <Text>UZA CANTEEN</Text>
        <Text>338890</Text>
      </View>
      <View>
        <Text>- KSH 20</Text>
        <Text>10 Jan 2024</Text>
      </View>
    </View>
    <View style={styles.transactionItem}>
      <View  style={styles.transactionItemIcon} >
      <FontAwesomeIcon icon={ faScroll }/>
      </View>
      <View>
        <Text>UZA CANTEEN</Text>
        <Text>338890</Text>
      </View>
      <View>
        <Text>- KSH 20</Text>
        <Text>10 Jan 2024</Text>
      </View>
    </View>
    <View style={styles.transactionItem}>
      <View  style={styles.transactionItemIcon} >
      <FontAwesomeIcon icon={ faScroll }/>
      </View>
      <View>
        <Text>UZA CANTEEN</Text>
        <Text>338890</Text>
      </View>
      <View>
        <Text>- KSH 20</Text>
        <Text>10 Jan 2024</Text>
      </View>
    </View>
    <View style={styles.transactionItem}>
      <View  style={styles.transactionItemIcon} >
      <FontAwesomeIcon icon={ faScroll }/>
      </View>
      <View>
        <Text>UZA CANTEEN</Text>
        <Text>338890</Text>
      </View>
      <View>
        <Text>- KSH 20</Text>
        <Text>10 Jan 2024</Text>
      </View>
    </View>
    <View style={styles.transactionItem}>
      <View  style={styles.transactionItemIcon} >
      <FontAwesomeIcon icon={ faScroll }/>
      </View>
      <View>
        <Text>UZA CANTEEN</Text>
        <Text>338890</Text>
      </View>
      <View>
        <Text>- KSH 20</Text>
        <Text>10 Jan 2024</Text>
      </View>
    </View>
    <View style={styles.transactionItem}>
      <View  style={styles.transactionItemIcon} >
      <FontAwesomeIcon icon={ faScroll }/>
      </View>
      <View>
        <Text>UZA CANTEEN</Text>
        <Text>338890</Text>
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

  mainContainer:{
    backgroundColor:'#ECF6FC',
    alignItems:'center',
    justifyContent:'space-evenly',
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
  containerTwo:{
    width:'80%',
    elevation: 7,
    padding:10,
    alignItems:'center',
    backgroundColor:'white',
    height:100,
    borderRadius:10,
  },
  containerTwoText:{
    fontSize:30,
  },
  containerThree:{
    width:'90%',
    marginTop: 15,
    flexDirection:'row',
    justifyContent:'space-evenly',    
  },
  buttonText:{
    color:'white',
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
  ButtonRed:{
      borderRadius: 20,
      padding: 10,
      backgroundColor: '#EE6B22',
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
  containerFour:{
    width:'95%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30,
  },
  containerFourT1:{
    fontSize:20,
    fontWeight:'bold',
  },
  containerFourT2:{
    fontSize:20,
    fontWeight:'bold',
    color:'#58C2FD',
  },
  containerFive:{
    width:'99%',
    marginTop:40,
    flexDirection:'column',
    alignContent:'center',
  },
  transactionItem:{
    width:'95%',
    elevation:8,
    height:100,
    padding:10,
    marginBottom:15,
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white',
    alignSelf:'center',
    alignItems:'center',
  },
  transactionItemIcon:{
    backgroundColor:'#58C2FD',
    alignItems:'center',
    paddingTop:10,
    width:40,
    height:40,
    borderRadius:999,
  },
});
