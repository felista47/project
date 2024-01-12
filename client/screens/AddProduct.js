import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
      productImage:'',
      productName: '',
      productDescription: '',
      productCategory:'',
      productAmount:'',
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.canceled === false) {
        const selectedImage = result.assets && result.assets.length > 0 ? result.assets[0] : null;
        if (selectedImage) {
          // Set the selected URI directly to the product object
          setProduct({
            ...product,
            productImage:selectedImage.uri, // Assuming selectedImage.uri is a string
          });
          
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  

  const handleAddProduct = async () => {
    console.log('here is the product',product.productImage)
    try {
      const response = await axios.post('http://172.16.87.224:5000/product', product, {
      
      });
  
      console.log('Product added successfully:', response.data);
  
      // Clear form fields after adding the product
      setProduct({
        productImage:'',
        productName: '',
        productDescription: '',
        productCategory: '',
        productAmount: '',
      });
      
      
  
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };
  

  return (
    <View style={styles.container}>
{product.productImage && <Image source={{ uri: product.productImage}} style={styles.image} />}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={product.productName}
        onChangeText={(text) => setProduct({ ...product,productName: text  })}
        />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={product.productDescription}
        onChangeText={(text) => setProduct({ ...product,productDescription: text  })}
      />
       <Picker
            selectedValue={product.productCategory}
            onValueChange={(text) => setProduct({ ...product,productCategory: text  })}
            style={styles.input}
          >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Stationery" value="stationery" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
     <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={product.productAmount}
        onChangeText={(text) => setProduct({ ...product, productAmount: text })}
        keyboardType="numeric"
      />

      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});

export default AddProduct;





