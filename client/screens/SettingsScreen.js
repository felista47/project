import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


const SettingsScreen = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

    // Check if the product is already in the cart
  
      // If already in the cart, display a button with a plus and delete sign
      return (
        <View style={styles.cartCountSection}>
          <TouchableOpacity onPress={() => handleDecreaseCartItem(existingProductIndex)}>
            <Ionicons name="remove" size={20} color="black" />
          </TouchableOpacity>
          <Text>{cartProducts[existingProductIndex].count}</Text>
          <TouchableOpacity onPress={() => handleRemoveCartItem(existingProductIndex)}>
            <Ionicons name="trash" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCart} onPress={() => handleAddToCart(product)}>
          <Text>Add To Cart</Text>
        </TouchableOpacity>
        </View>
      // If not in the cart, display button with "Add To Cart" text

      
      );
    }
  
 


export default SettingsScreen

const styles = StyleSheet.create({})