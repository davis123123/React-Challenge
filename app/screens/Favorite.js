import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header'


const Favorite = ()=>{
   return(
       <View style={{flex:1}}>
           <Header />
           <Text>Favorite videos</Text>
       </View>
   )
}

export default Favorite