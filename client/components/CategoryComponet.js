import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,FlatList} from 'react-native';
import axios from 'axios';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    // Default category, you can set it to any default value
    handleCategory('Food');
  }, []);

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

    const renderItem = ({ item }) => (
      <View style={styles.productItem}>
        <Text>{item.productName}</Text>
        {/* Add more product details as needed */}
      </View>
    );

  return (
    <View style={styles.containerCategoryMain}>
      <View>
        <View style={styles.containerCategory}>
        <TouchableOpacity style={styles.buttonBlue} onPress={() => handleCategory('Food')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRed} onPress={() => handleCategory('Stationery')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Stationery</Text>
        </TouchableOpacity>
        </View>
       
        <View style={styles.containerCategory} >
        <TouchableOpacity style={styles.buttonGreen} onPress={() => handleCategory('Others')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Others</Text>
        </TouchableOpacity><TouchableOpacity style={styles.buttonPurple} onPress={() => handleCategory('Others')}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Others</Text>
        </TouchableOpacity>
        </View>
        
      </View>
      
   {/* Display selected category */}
   {selectedCategory && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
            Products in {selectedCategory}
          </Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item._id} // Use a unique key for each item
            renderItem={renderItem}
          />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
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

});

export default ProductList;
