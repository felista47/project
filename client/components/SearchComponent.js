import { View, TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


const SearchComponent = () => {
  return (
    <View style={styles.main}>
        <View style={styles.inputSection}>
            <TextInput placeholder='search' style={styles.input}/>
        <Ionicons name="search" size={24} color='black'/>
        </View>
        <TouchableOpacity style={styles.cart}>
        <Ionicons name="cart" size={40} color='white'/>
        </TouchableOpacity>
    </View>
  )
}

export default SearchComponent

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
    }
})