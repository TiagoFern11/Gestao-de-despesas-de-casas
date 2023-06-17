import { useEffect, useState } from "react";
import {View, Text, TextInput, StyleSheet, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";

import { CommonStyles } from "../styles";

const SettingsScreen = () => {
    const [data, setData]=useState("");
    const  [loggedUser, setLoggedUser]=useState("");
const[name, setName]=useState("");
const[city, setCity]=useState("");

    useEffect(()=> {
        AsyncStorage.getItem('name').then((val) => setName(val));
        AsyncStorage.getItem('city').then((val) => setCity(val));
    },[]);
    return(
        <View style={styles.container}>
            <Text style={stylesSheet.title}> Settings</Text>
            <TextInput 
               placeholder='Name' style ={styles.textInput} value ={data.name} onChangeText={(val) => setData({...data, name: val})}/>
            <TextInput 
               placeholder='City' style ={styles.textInput} value ={data.city} onChangeText={(val) =>setData({...city, name: val})}/>
        <Botton  onPress={() => {
            AsyncStorage.setItem('name', name);
            AsyncStorage.setItem('city', city);
         }}
        title='Save'
        />
        <Botton 
        title="Logout" 
        onPress={() => {
            singOut(getAuth())
            .then(()=> {
              setLoggedUser(null);

            })
            .catch((error=> console.log(error)));
         }} />
       </View>    
    )
}


const contactsStyles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignContent:'center',
      backgroundColor: 'powerblue',
    },
    textInput:{
      borderWidth:1,
      width:200,
      height:40,
      //asdvav
    }
    
    
  })