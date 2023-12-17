import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase';

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const MAX_RETRIES = 10;
  let retryCount = 0;

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebaseApp);
      const productsCollection = collection(db, 'products');

      try {
        const querySnapshot = await getDocs(productsCollection);
        const productsData = [];

        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        setProducts(productsData);
        retryCount = 0;
      } catch (error) {
        console.error('Error fetching data:', error);
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          // Retry after a delay (e.g., 5 seconds)
          setTimeout(fetchData, 5000);
        }
      }
    };

    fetchData();
  }, []);

  if (products.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <Text>ALL PRODUCTS</Text>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatlist}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.products}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <Text>Ksh:{item.price}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonOne} onPress={() => navigation.navigate('addProduct')}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 999,
    marginBottom: 16,
  },
  products: {
    padding: 10,
    alignItems: 'center',
    marginRight: 16,
  },
  buttonOne: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#58C2FD',
    width: 150,
    alignSelf: 'center',
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
  },
});

export default ProductDetails;
