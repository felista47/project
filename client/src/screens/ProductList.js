import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView ,Image,TextInput} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart} from "../reduxStore/reducers/CartReducer";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'

 
const ProductList=({})=> {
  const {userEmail} = useAuth();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


  const navigateToCart = () => {
    navigation.navigate('Cart'); 
  };
  const navigateToAddProduct = () => {
    navigation.navigate('AddProduct'); 
  };
  useEffect(() => {
    handleCategoryAll();
    handleCategory('Food');
  }, []);
  const handleCategoryAll = async () => {
    try {
      const response = await axios.get(`https://pocket-money.up.railway.app/product/vendors/${userEmail}`, {
        timeout: 5000,
      });
      const productData = response.data;
      setProducts(productData);
      setSelectedCategory('All')

    } catch (error) {
      console.error('Error fetching products category all data:', error);
    }};

  const handleCategory = async (category) => {
      try {
        const response = await axios.get(`https://pocket-money.up.railway.app/product/${userEmail}/category/${category}`, {
          timeout: 5000,
        });
        const productData = response.data;
        setProducts(productData);
        setSelectedCategory(category);
  
      } catch (error) {
        console.error('Error fetching products category data:', error);
    }};
  
const handleSearch = async () => {
        try {
          const response = await axios.get(`https://pocket-money.up.railway.app/product/vendors/${userEmail}/search?query=${query}`, {
            timeout: 5000,
          });
      
          const searchResults = response.data;
          setProducts(searchResults);
          setSelectedCategory('Search results'); // Clear selected category
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
    };
  const handleCartPress = (item) => {
      dispatch(addToCart(item));
    };

 
  return (
    <View style={styles.containerMain}>

      <View style={styles.search}>
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
            <TouchableOpacity style={styles.cart} onPress={()=>navigateToCart()}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 }}>{totalItems}</Text>
              <Ionicons name="cart" size={40} color='white'/>
            </TouchableOpacity>
      </View>

      <View style={styles.categories}>
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
          <Text style={{ color: 'white', textAlign: 'center' }}>others</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonPurple} onPress={() => handleCategoryAll('All')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>All</Text>
        </TouchableOpacity>
        </View>
        
       </View>

       <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
            Products in {selectedCategory}
      </Text>
      <TouchableOpacity style={styles.buttonRed} onPress={()=>navigateToAddProduct('AddProduct')}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Add Product</Text>
    </TouchableOpacity>

    {selectedCategory && (

      <ScrollView style={styles.containerFive}>

          {products.map((item,) => (
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
            

            </View>
        ))}
        
      </ScrollView>
   )}
   </View>
  );
}
const styles = StyleSheet.create({
containerMain:{
    backgroundColor:'#ECF6FC',
    alignItems:'center',
    justifyContent:'space-evenly',

},
search:{
    padding: 10,
    justifyContent:'space-between',
    alignItems:"center",
    flexDirection:"row",
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
    width: "70%"
},
cart:{
    backgroundColor:'#58C2FD',
    borderRadius: 999,
    marginLeft:10
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
containerFive:{
  width:'99%',
  marginTop:40,
  flexDirection:'column',
  alignContent:'center',
  marginBottom:100,
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
