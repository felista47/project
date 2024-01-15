import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,TextInput,Image, ScrollView} from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';


const ProductList = ({}) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

 
  useEffect(() => {
    handleCategory('Food');
    handleCategoryAll();

  }, []);
  const handleCategoryAll = async () => {
    try {
      const response = await axios.get(`http://172.16.55.136:5000/product/`, {
        timeout: 5000,
      });
      const productData = response.data;
      setProducts(productData);
      setSelectedCategory('All')

    } catch (error) {
      console.error('Error fetching products data:', error);
    }};

  const handleCategory = async (category) => {
    try {
      const response = await axios.get(`http://172.16.55.136:5000/product/category/${category}`, {
        timeout: 5000,
      });
      const productData = response.data;
      setProducts(productData);
      setSelectedCategory(category);

    } catch (error) {
      console.error('Error fetching products data:', error);
    }};

  const handleSearch = async () => {
      try {
        const response = await axios.get(`http://172.16.55.136:5000/product/Search/search?query=${query}`, {
          timeout: 5000,
        });
    
        const searchResults = response.data;
        setProducts(searchResults);
        setSelectedCategory('Search results'); // Clear selected category
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

 const handleCartPress = (product) => {
      // Check if the product is already in the cart
      const existingProductIndex = cartProducts.findIndex((p) => p._id === product._id);
    
      if (existingProductIndex !== -1) {
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
          </View>
        );
      } else {
        // If not in the cart, display button with "Add To Cart" text
        return (
          <TouchableOpacity style={styles.buttonCart} onPress={() => handleAddToCart(product)}>
            <Text>Add To Cart</Text>
          </TouchableOpacity>
        );
      }
    };
    
    const handleAddToCart = (product) => {
      // Add the product to the cart with an initial count of 1
      setCartProducts([...cartProducts, { ...product, count: 1 }]);
      setCartCount(cartCount + 1);
    };
    
    const handleDecreaseCartItem = (index) => {
      // Decrease the count of the item in the cart
      const updatedCart = [...cartProducts];
      updatedCart[index].count = Math.max(updatedCart[index].count - 1, 0);
      setCartProducts(updatedCart);
      setCartCount(cartCount - 1);
    };
    
    const handleRemoveCartItem = (index) => {
      // Remove the item from the cart
      const updatedCart = [...cartProducts];
      updatedCart.splice(index, 1);
      setCartProducts(updatedCart);
      setCartCount(cartCount - 1);
    };
    
   
  return (
    <View style={styles.containerCategoryMain}>
          <View style={styles.main}>
      <View style={styles.inputSection}>
      <TextInput
            placeholder='Search'
            style={styles.input}
            onChangeText={(text) => setQuery(text)}
          />

        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color='black' />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.cart}>
        <Ionicons name="cart" size={40} color='white'>{cartCount}</Ionicons>
      </TouchableOpacity>
    </View>
      <View>
        <View style={styles.containerCategory}>
        <TouchableOpacity style={styles.buttonBlue} onPress={() => handleCategory('Food')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRed} onPress={() => handleCategory('stationery')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Stationery</Text>
        </TouchableOpacity>
        </View>
       
        <View style={styles.containerCategory} >
        <TouchableOpacity style={styles.buttonGreen} onPress={() => handleCategory('Others')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Others</Text>
        </TouchableOpacity><TouchableOpacity style={styles.buttonPurple} onPress={() => handleCategoryAll('All')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>All</Text>
        </TouchableOpacity>
        </View>
        
      </View>
      
   {/* Display selected category */}
   {selectedCategory && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
            Products in {selectedCategory}
          </Text>
     <ScrollView style={styles.scrollView}>
          {products.map((item) => (
          <View key={item._id} style={styles.productContainer}>
          <Image source={{ uri: item.productImage }} style={styles.image} />
          <View>
            <Text>{item.productName}</Text>
            <Text>{item.productDescription}</Text>
          </View>
          <Text>Ksh: {item.productAmount}</Text>
          <TouchableOpacity style={styles.buttonCart} onPress={handleCartPress}> 
            <Text>Add To Cart</Text>
          </TouchableOpacity>
          </View>
      ))}
    </ScrollView>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  main:{
    padding: 20,
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"row"
},
inputSection:{
    width: '80%',
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"row",
    backgroundColor:"white",
    borderRadius: 7
},
input:{
    height: 40,
    backgroundColor: "white",
    width: "85%"
},
cart:{
    backgroundColor:'#58C2FD',
    borderRadius: 999,
},
  containerCategory: {
    width: '90%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonBlue:{
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
buttonPurple:{
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#7282BC',
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
buttonCart:{
  borderRadius: 20,
  padding: 10,
  backgroundColor: '#EE6B22',
  width: 100,
  alignSelf: 'center',
  alignItems:'center',
  elevation: 8, 
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowRadius: 6,
},
image: {
  width: 100,
  height: 100,
  borderRadius: 999,
  marginBottom: 16,
},
productItem: {
  padding: 10,
  alignItems: 'center',
  marginRight: 16,
},
scrollView:{
  width:'99%',
  marginTop:40,
  flexDirection:'column',
  alignContent:'center',
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
});

export default ProductList;
