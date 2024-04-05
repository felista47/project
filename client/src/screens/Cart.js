import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import  {Ionicons,Feather} from '@expo/vector-icons';
import { decrementQuantity, incrementQuantity, removeFromCart ,clearCart} from "../reduxStore/reducers/CartReducer";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showPayment, setShowPayment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [studentID, setStudentID] = useState('');
  const [customer, setCustomer] = useState({
    BalAmount: 0
  });

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
    setShowPayment(!showPayment);
  };

  const checkout = async () => {
    try {
      const balAmount = parseFloat(customer.BalAmount);
  
      console.log('Data before update:', { BalAmount: balAmount, studentID: studentID });
      const response = await axios.put(`https://pocket-money.up.railway.app/student/checkOut/${studentID}`, { BalAmount: balAmount });
      console.log('Data after update:', response.data);
      dispatch(clearCart());
      alert('Payment made successfully!');
      setShowPayment(false);
      navigation.navigate('VendorHomeScreen');
    } catch (error) {
      if (error.response) {
        // If the error has a response, it means the server returned an error response
        const errorMessage = error.response.data.message;
        alert(errorMessage); // Display the error message to the user
      } else {
        // If the error does not have a response, it's likely a network error
        console.error('Network error:', error.message);
        alert('Network error. Please check your internet connection.');
      }
    }
  };
  
  

  return (
    <View style={styles.containerMain}>
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
      <View style={styles.containerSell}>
        {!showPayment ? (
          <Pressable style={styles.buttonRed} onPress={togglePayment}>
            <Text>Make Payment</Text>
          </Pressable>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Student ID"
              value={studentID}
              onChangeText={setStudentID}
            />
            <TouchableOpacity style={styles.buttonOne} onPress={checkout}>
              <Text>PAY</Text>
            </TouchableOpacity>
          </View>
        )}
        <Pressable style={styles.buttonGreen} onPress={navigateToProducts}>
          <Text>Continue Selling</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Cart;

const styles = StyleSheet.create({
  containerMain: {
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
})
