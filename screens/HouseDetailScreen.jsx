import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from "react-native"

import { collection, getDoc, getFirestore, doc } from "firebase/firestore";
import {CommonStyles, PostStyles} from "../styles";


const HouseDetailScreen = ({route, navigation}) =>{
    
    const {houseId} = route.params;
    const [house, setPost] = useState(null);

    useEffect(()=>{
        
        const housesRef = collection(getFirestore(),'houses');
        const docRef= doc(housesRef, houseId);
        getDoc(docRef)
        .then((res) => {
            setPost({...res.data(),id: houseId});
        })
        .catch((error) => console.log(error));
    
    },[]);

    const renderPost=({item:house})=>{
        return(

        <View style={CommonStyles.houseContainer}>
            <Text>Casa: {house.id}</Text>
            <Text>Morada: {house.address}</Text>
            <Text>Tipo de habitação: {house.typology}</Text>
            <Text>Data de inicio de construção: {house.const_start}</Text>
            <Text>Data de finalização da construção: {house.const_finish}</Text>
            <TouchableOpacity style={CommonStyles.botao} onPress={()=> {
                navigation.navigate("HouseDetail", { houseId:house.id}) }}>
                <Text style={CommonStyles.BtnText}>Ver Detalhes</Text>
            </TouchableOpacity>
        </View>
        )
    }
    return (
        <>
        {house &&
        <View style={CommonStyles.houseContainer}>
        <Text>Casa: {house.id}</Text>
        <Text>Morada: {house.address}</Text>
        <Text>Tipo de habitação: {house.typology}</Text>
        <Text>Data de inicio de construção: {house.const_start}</Text>
        <Text>Data de finalização da construção: {house.const_finish}</Text>
        {/* <TouchableOpacity style={CommonStyles.botao} onPress={()=> {
            navigation.navigate("HouseDetail", { houseId:house.id}) }}>
            <Text style={CommonStyles.BtnText}>Ver Detalhes</Text>
        </TouchableOpacity> */}
    </View> }
        </>
      )
};

  export default HouseDetailScreen

