import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../firebase'; 

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const MAX_RETRIES = 5;
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
          retryCount = 0;
        });

        //  to display the first product 
        setProduct(productsData[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(fetchData, 5000);
      }

      }
    };

    fetchData();
  }, []);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image}} style={styles.image} />
      <Text>{product.name}</Text>
      <Text>{product.Description}</Text>
      <Text>${product.price}</Text>
      {/* Add more details based on your product structure */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
});

export default ProductDetails;
