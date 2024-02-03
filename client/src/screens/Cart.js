import { StyleSheet, Text, View,Image, TouchableOpacity, Pressable} from 'react-native'
import React from 'react'
import  {Ionicons,Feather} from '@expo/vector-icons';
import { useSelector,useDispatch } from 'react-redux';
import {decrementQuantity, incrementQuantity, removeFromCart } from "../reduxStore/reducers/CartReducer";
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const totalPrice = cart.reduce((acc, item) => acc + item.productAmount * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
    console.log("Cart Length:", cart);

  };

const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  }

const decreaseQuantity = (item) => {
    if(item.quantity == 1){
      dispatch(removeFromCart(item));
    }else{
      dispatch(decrementQuantity(item));
    }
  }
  const navigateToProducts= () => {
    navigation.navigate('VendorHomeScreen'); 
  };
  const navigateToPay= () => {
    navigation.navigate('MakePayment'); 
  };
  return (
  <View style={styles.containerMain}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>Cart Items:</Text>
    {cart.map((item,) => (
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
         <TouchableOpacity style={styles.buttonCart} onPress={() =>decreaseQuantity(item)}>
            <Feather name="minus" size={24} color="black" />          
        </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCart} onPress={() => removeItemFromCart(item)}>
           <Ionicons name="trash" size={24} color='black'></Ionicons>
          </TouchableOpacity>

      </View>
        ))}
        <View style={styles.productContainer}>
          <Text>{totalItems}</Text>
          <Text>KSH.{totalPrice.toFixed(2)}</Text>
        </View>
      <View style={styles.containerSell}>
        <Pressable style={styles.buttonRed} onPress={()=>navigateToPay()}><Text>Make Payment</Text></Pressable>
        <Pressable style={styles.buttonGreen} onPress={()=>navigateToProducts()}><Text>Continue Selling</Text></Pressable>
      </View>
      
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
containerMain:{
  backgroundColor:'#ECF6FC',
  alignItems:'center',
  justifyContent:'space-evenly',

},
productContainer:{
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
})