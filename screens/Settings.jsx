import { useEffect, useState } from "react";
import {View, Text, TextInput, StyleSheet, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { useEffect, useState, useContext } from "react";
import { getAuth } from "firebase/auth";

import { CommonStyles } from "../styles";

const Settings = ({ navigation }) => {
    // To get the value from TextInput
    const [textInputName, setTextInputName] = useState("");
    const [textInputCity, setTextInputCity] = useState("");

    const storeData = async () => {
        // function to save the value in AsyncStorage
        if (textInputName && textInputCity) {
            // To check the input is not empty

            await AsyncStorage.setItem("name", textInputName);
            await AsyncStorage.setItem("city", textInputCity);

            alert("Defenições guardadas!");
        } else {
            alert("Impossível guardar em branco!");
        }
    };

    const goToSignIn = () => {
        // Navigate to SignIn
        navigation.navigate("SignIn");
    }

    return (
        <View style={CommonStyles.container}>
            <Text style={styles.header}>Defenições</Text>
            
                
                <View style={styles.separator}></View>
                <Text style={styles.textSecundary}>Insira para receber uma mensagem de boas vindas!</Text>
                <View style={styles.separator}></View>
            <TextInput
                placeholder={"Seu Nome"}
                value={textInputName}
                onChangeText={(data) => setTextInputName(data)}
                style={styles.input}
            />
            <TextInput
                placeholder={"Sua Cidade"}
                value={textInputCity}
                onChangeText={(data) => setTextInputCity(data)}
                style={styles.input}
            />
            <Button title={"Guardar"} onPress={storeData} style={styles.input} />
            <View style={styles.separator}></View>
            <TouchableHighlight onPress={goToSignIn} underlayColor="white">
                <View style={styles.customButtonCancel}>
                    <Text style={styles.customButtonText}>Sair</Text>
                </View>
            </TouchableHighlight>

        </View>
    );
};
export default Settings;
