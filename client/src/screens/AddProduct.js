import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet ,KeyboardAvoidingView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';
import { useAuth } from '../context/AuthContext'

const AddProduct = ({navigation}) => {
  const {userEmail} = useAuth();

  const [product, setProduct] = useState({
    vendor:'',
      productImage:'',
      productName: '',
      productDescription: '',
      productCategory:'',
      productAmount:'',
  });
  useEffect(() => {
    setProduct(prevProduct => ({ ...prevProduct, vendor: userEmail }));
  }, [userEmail]);
  

    useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, [userEmail]);

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
    try {
      console.log('product', userEmail,product);

      const response = await axios.post('https://pocket-money.up.railway.app/product', product, {
      
      });
  
      console.log('Product added successfully:',response.data);
  
      setProduct({
        vendor:'',
        productImage:'',
        productName: '',
        productDescription: '',
        productCategory: '',
        productAmount: '',
      });
      
        navigation.navigate('VendorHomeScreen'); 
      
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };
  

  return (
    <KeyboardAvoidingView  behavior="padding" style={styles.container}>
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
            <Picker.Item label="Pick a category" value="" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Stationery" value="stationery" />
            <Picker.Item label="others" value="others" />
          </Picker>
     <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={product.productAmount}
        onChangeText={(text) => setProduct({ ...product, productAmount: text })}
        keyboardType="numeric"
      />

      <Button title="Add Product" onPress={handleAddProduct} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
flex:1,
paddingTop: '5%',
    justifyContent:'space-evenly',
    backgroundColor:'#ECF6FC',
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





