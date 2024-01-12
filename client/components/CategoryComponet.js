import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,TextInput,Image, ScrollView} from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';


const ProductList = ({}) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

 
  useEffect(() => {
    // Default category, you can set it to any default value
    handleCategory('Food');
    handleCategoryAll();

  }, []);
  const handleCategoryAll = async () => {
    try {
      const response = await axios.get(`http://172.16.87.225:5000/product/`, {
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
      const response = await axios.get(`http://172.16.87.225:5000/product/category/${category}`, {
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
        const response = await axios.get(`http://172.16.87.225:5000/product/Search/search?query=${query}`, {
          timeout: 5000,
        });
    
        const searchResults = response.data;
        setProducts(searchResults);
        setSelectedCategory('Search results'); // Clear selected category
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
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
        <Ionicons name="cart" size={40} color='white' />
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
// scrollView: {
//   paddingVertical: 10,
// },
// productContainer: {
//   marginRight: 10,
// },
// products: {
//   flex: 1,
//   flexDirection: 'column',
//   alignItems: 'center',
// },
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
