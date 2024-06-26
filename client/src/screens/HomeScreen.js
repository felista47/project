import { StyleSheet, Text, View, Image,TouchableOpacity, Pressable,ScrollView ,KeyboardAvoidingView} from 'react-native';
import React, { useState, useEffect } from 'react';
import { faBell,faChartPie,faEyeSlash, faScroll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({navigation}) => {
  const { accountType,userEmail} = useAuth();
  const [greeting, setGreeting] = useState('');
  const [parent, setParent] = useState('');
  const [students, setStudents] = useState([]);
  const [transactions, setTransaction] = useState([]);

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

  useEffect(() => {
    fetchData();
    fetchChildData();
    fetchTransactionsData();
  }, [accountType, userEmail]);
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/parent/${userEmail}`, { timeout: 5000 });
      const parentInfo = response.data;

      setParent(parentInfo)
       } 
    catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchChildData = async () => {
    try {
      const response =await axios.get(`https://pocket-money.up.railway.app/student/parent/${userEmail}`);
      const studentsData = response.data;
      setStudents(studentsData);
      console.log('children data:',students);
    } catch (error) {
      if (error.response.status === 404){
        alert('add a student to deposit money for',navigation.navigate('HomeScreen'))
      }
      console.error('Error fetching parents children data:', error);
    }
  };

  const fetchTransactionsData = async () => {
    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/transactions/${userEmail}`,{ timeout: 5000 });
      const TransactionsInfo = response.data;
      setTransaction(TransactionsInfo)
      console.log('transactions data',TransactionsInfo)
       } 
    catch (error) {
  
      console.error('Error fetching transaction data:', error);
    }
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile'); 
    console.log('profilefrom Home',accountType,userEmail)
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen focused, refetching data...");
      fetchData();
    }, [])
  );
  

  if (!parent) {
    return <Text>Loading...</Text>;
  }
 

  return (
<KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
      {/* top part contains user image links to account, notification and spending chart */}
  <View style={styles.containerOne}>
  <TouchableOpacity style={styles.containerProfile} onPress={navigateToProfile}>
      {/* profile pic */}
      <TouchableOpacity style={styles.avatar} onPress={navigateToProfile}>
        <Image style={styles.image} source={require('../../assets/avatar.png')} />
      </TouchableOpacity>

      {/* USER GREETINGS */}
        <View style={styles.userGreetings}>
            <Text style={styles.greetingText}>{greeting},</Text>
            <Text style={styles.text}>{userEmail}</Text>
        </View>
  </TouchableOpacity>
    <View style={styles.containerIcons}>
      <FontAwesomeIcon icon={ faBell } />
      <FontAwesomeIcon icon={ faChartPie } />
    </View>
  </View>

      {/* balance of user account */}
      <View style={styles.containerTwo}>
  {students.length > 0 ? (
    students.map((student, index) => (
      <Pressable onPress={()=>navigation.navigate('Finance')} style={styles.containerTwoBal} key={index}>
        <Text style={{textAlign: 'center', fontSize:18 }}>Balance</Text>
        <Text style={{textAlign: 'center', fontSize:24, fontWeight:'400' }}> KSH. {student.BalAmount}<FontAwesomeIcon icon={ faEyeSlash } /></Text>
        <Pressable onPress={()=>navigation.navigate('Finance')}>
          <Text style={{fontSize:18, fontWeight:'bold',color:'#2ECC71'}}>Allowance Limit KSH.{student.AllowanceLimit}</Text>
        </Pressable> 
      </Pressable>
    ))
  ) : (
    <Pressable onPress={()=>navigation.navigate('Finance')} style={styles.containerTwoBal}>
      <Text style={{textAlign: 'center', fontSize:18 }}>Balance</Text>
      <Text style={{textAlign: 'center', fontSize:24, fontWeight:'400' }}> KSH. 0.00<FontAwesomeIcon icon={ faEyeSlash } /></Text>
      <Pressable onPress={()=>navigation.navigate('Finance')}>
        <Text style={{fontSize:18, fontWeight:'bold',color:'#2ECC71'}}>Allowance Limit KSH.0.00</Text>
      </Pressable> 
    </Pressable>
  )}
</View>


  {/* withdraw and deposit options */}
  <View style={styles.containerThree}>
    <TouchableOpacity style={styles.ButtonBlue} onPress={()=>navigation.navigate('Deposit')}>
      <Text style={styles.buttonText}>Deposit</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.ButtonRed} onPress={()=>navigation.navigate('Profile')}>
    <Text style={styles.buttonText}>Student</Text>
    </TouchableOpacity>
  </View>

  {/* Transaction statement */}
  <View style={styles.containerFour}>
    <Text style={styles.containerFourT1}>TRANSACTION STATEMENT</Text>
    <Text style={styles.containerFourT2}>See all</Text>
  </View>

  {/* Transaction statement item */}
  <ScrollView style={styles.containerFive}>
  {transactions.length > 0 ? (
    transactions.map((transaction, index) => (
      <View style={styles.transactionItem} key={index}>
        <View  style={styles.transactionItemIcon} >
          <FontAwesomeIcon icon={ faScroll }/>
        </View>
        <View>
          <Text>{transaction.paymentAccount}</Text>
          <Text>{transaction.confirmationCode}</Text>

        </View>
        <View>
          <Text>KSH. {transaction.Amount}</Text>
          <Text>{new Date(transaction.createdAt).toLocaleString()}</Text>
        </View>
      </View>
    ))
  ) : (
    <View style={styles.transactionItem}>
      <Text>Your transactions will appear here</Text>
    </View>
  )}
</ScrollView>

</KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

  mainContainer:{
    backgroundColor:'#e0f2f1',
    alignItems:'center',
    justifyContent:'space-evenly',
    flex: 1,
  },

  containerOne: {
    paddingTop:'10%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerProfile:{
    paddingLeft:'5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 34,
    height: 34,
    borderRadius: 999,
  },
  userGreetings: {
    marginLeft: '5%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerIcons:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:'40%'
  },
  containerTwo:{
    width:'80%',
    elevation: 7,
    marginTop:'5%',
    backgroundColor:'white',
    height:'15%',
    borderRadius:10,
  },
  containerTwoBal:{
    padding:'5%',
    flex:1,
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  containerTwoText:{
    fontSize:20,
  },
  containerThree:{
    width:'90%',
    marginTop: '5%',
    flexDirection:'row',
    justifyContent:'space-evenly',    
  },
  buttonText:{
    color:'white',
  },
  ButtonBlue:{//changed to green
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#2ECC71',
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
    marginTop:'10%',
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
    marginTop:'5%',
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
