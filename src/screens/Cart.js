import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../reduxStore/reducers/CartReducer";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
    console.log("Cart Length:", cart);

  };
  return (
    <View>
<Text>Cart Items:</Text>
{cart.map((item,) => (
            <View key={item._id} style={styles.productContainer}>
            <Image source={{ uri: item.productImage }} style={styles.image} />
            <View>
              <Text>{item.productName}</Text>
              <Text>{item.productDescription}</Text>
            </View>
            <Text>Ksh: {item.productAmount}</Text>

              <TouchableOpacity style={styles.buttonCart} onPress={() => handleCartPress(item)}>
                <Text>Add To Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCart} onPress={() => removeItemFromCart(item)}>
                <Text>delete</Text>
              </TouchableOpacity>

            </View>
        ))}
      
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
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
})