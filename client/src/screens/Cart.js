import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Button,Pressable,KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import  {Ionicons,Feather} from '@expo/vector-icons';
import { decrementQuantity, incrementQuantity, removeFromCart ,clearCart} from "../reduxStore/reducers/CartReducer";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'
import { Camera } from 'expo-camera';


const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const {userEmail} = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPayment, setShowPayment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [studentID, setStudentID] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [customer, setCustomer] = useState({
    BalAmount: 0
  });

  //camera permision
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

//cart 
  useEffect(() => {
    const price = cart.reduce((acc, item) => acc + item.productAmount * item.quantity, 0);
    setTotalPrice(price);
    setCustomer({ BalAmount: price.toFixed(2) });
  }, [cart]);

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  }

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  }

  const navigateToProducts = () => {
    navigation.navigate('VendorHomeScreen');
  };

  const togglePayment = () => {
    try{
      setShowPayment(!showPayment);
    }
    catch(error){
      console.error('toggle', error);

    }
   
  };

  const changeStudentID = async (barcodeData) => {
    if (!barcodeData || typeof barcodeData.data !== 'string') {
      console.error('Invalid barcode data format:', barcodeData);
      alert('Invalid barcode data format. Please try again.');
      return;
    }
  
    const { data } = barcodeData;
    setScanned(true);
  
    try {
      const [receivedStudentID, receivedUserEmail] = data.split(',');
      setStudentID(receivedStudentID);
      setParentEmail(receivedUserEmail);
      console.log('Scanned student ID:', receivedStudentID);
      console.log('Scanned user email:', receivedUserEmail);
    } catch (error) {
      console.error('Error parsing barcode data:', error);
      alert('Error parsing barcode data. Please try again.');
    }
  };
  

if (hasPermission === null) {
  return <Text>Requesting for camera permission</Text>;
}
if (hasPermission === false) {
  return <Text>No access to camera</Text>;
}


  const checkout = async () => {
    try {
      const balAmount = parseFloat(customer.BalAmount);
      console.log('Data before update:', { BalAmount: balAmount, studentID:studentID });
      const response = await axios.put(`https://pocket-money.up.railway.app/student/checkout/${studentID}`, { BalAmount: balAmount });
      console.log('Data after student update:', response.data);

      //save transaction
      const transactions = [];

      cart.forEach(async item => {
        const transaction = {
          parent: parentEmail,
          Amount: item.productAmount * item.quantity,
          createdAt: new Date(),
          confirmationCode : item.productName,
          paymentAccount: userEmail,
          paymentMethod: userEmail
        };
        transactions.push(transaction);
        console.log('transactions',transactions)
        const sellsTransactions =  await axios.post(`https://pocket-money.up.railway.app/transactions`, transactions);
        console.log('saving transaction:', sellsTransactions.data);
      })
      



      dispatch(clearCart());
      alert('Payment made successfully!');
      setShowPayment(false);
      console.log('Data before update:', { shopBal: balAmount, userEmail});
      const shopBal = await axios.put(`https://pocket-money.up.railway.app/vendor/${userEmail}`, {shopBal: balAmount});
      console.log('Data after vendor update:', shopBal.data);
      navigation.navigate('VendorHomeScreen');
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        alert(errorMessage);
      } else {
        // If the error does not have a response, it's likely a network error
        console.error('Network error:', error.message);
        alert('Network error. Please check your internet connection.');
      }
    }
  };
  
  
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.containerMain}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Cart Items:</Text>
        {cart.map((item) => (
          <View key={item._id} style={styles.productContainer}>
            <Image source={{ uri: item.productImage }} style={styles.image} />
            <View>
              <Text>{item.productName}</Text>
            </View>
            <Text>Ksh: {item.productAmount}</Text>
            <TouchableOpacity style={styles.buttonCart} onPress={() => increaseQuantity(item)}>
              <Ionicons name="add" size={24} color='black'></Ionicons>
            </TouchableOpacity>
            <Text>{item.quantity}</Text>
            <TouchableOpacity style={styles.buttonCart} onPress={() => decreaseQuantity(item)}>
              <Feather name="minus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCart} onPress={() => removeItemFromCart(item)}>
              <Ionicons name="trash" size={24} color='black'></Ionicons>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.productContainer}>
          <Text>Total Items: {cart.length}</Text>
          <Text>Total Price: KSH.{totalPrice.toFixed(2)}</Text>
        </View>
        {!showPayment ? (
        <Pressable style={styles.buttonRed} onPress={togglePayment}>
          <Text>Scan to Make Payment</Text>
        </Pressable>
      ) : (
  
      <>
            {cart.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                  <Text>Your cart is empty</Text>
                  <Pressable style={styles.buttonGreen} onPress={navigateToProducts}>
                    <Text>Continue Shopping</Text>
                  </Pressable>
                </View>
              ) : (
        <View style={styles.cameraContainer}>

          <Text>scanner appears</Text>
          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          )}
           <Camera
            style={styles.cameraContainer}
            onBarCodeScanned={scanned ? undefined : changeStudentID}
          />
          
          {studentID !== '' && parentEmail !== '' && (
            <View style={styles.dataContainer}>
              {/* <Text style={styles.dataText}>Student ID: {studentID}</Text>
              <Text style={styles.dataText}>Parent Email: {parentEmail}</Text> */}
              <Text> scan completed click to  pay</Text>
              <Pressable style={styles.buttonGreen} onPress={checkout}>
          <Text> scan completed click to  pay</Text>
        </Pressable>
            </View>
          )} 
        </View>
      )}
      </>
    )}
       
         <Pressable style={styles.buttonGreen} onPress={navigateToProducts}>
          <Text>Continue Selling</Text>
        </Pressable>
      </KeyboardAvoidingView>
    );

  
}

export default Cart;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#ECF6FC',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  productContainer: {
    width: '95%',
    elevation: 8,
    height: 100,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonRed:{
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
buttonGreen:{
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#53AC65',
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
containerSell: {
  width: '90%',
  marginTop: 15,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
},
containerScan: {
  width: '90%',
  marginTop: 15,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
},
image: {
  width: 100,
  height: 100,
  borderRadius: 999,
  marginBottom: 16,
},
// text: {
//   fontSize: 20,
//   fontWeight: 'bold',
// },
input: {
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginTop: 10,
  width: '80%',
},
buttonOne: {
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#EE6B22',
  width: 150,
  alignSelf: 'center',
  alignItems: 'center',
  elevation: 8,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 6,
  marginTop: 20,
},
cameraContainer: {
  flex: 1,
  height:'90%',
  width:'100%'
},
dataContainer: {
  position: 'absolute',
  bottom: 50,
  left: 0,
  right: 0,
  padding: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
},
dataText: {
  fontSize: 18,
  marginBottom: 10,
},
})
