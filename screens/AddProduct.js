import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../firebase'; // Replace with your actual path

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProductImage(result.assets);
    }
  };

  const handleAddProduct = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const productsCollection = collection(db, 'products');

      const newProduct = {
        name: productName,
        Description: productDescription,
        price: parseFloat(productPrice), // Convert to a numeric value
        image: productImage,
      };

      const docRef = await addDoc(productsCollection, newProduct);
      console.log('Product added with ID:', docRef.id);

      // Clear form fields after adding the product
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage(null);

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <View style={styles.container}>
      {productImage && <Image source={{ assets: productImage }} style={styles.image} />}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={productDescription}
        onChangeText={setProductDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
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

export default AddProductForm;
