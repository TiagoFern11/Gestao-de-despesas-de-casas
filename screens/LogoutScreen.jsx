import { View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import { getAuth, signOut } from 'firebase/auth';
import { useContext, useState } from "react";

import { CommonStyles } from "../styles";

import UserContext from "../contexts/UserContext";




const LogoutScreen =() => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    return (
        <View style={logoutStyles.container}>
            <Text style={logoutStyles.title}>Logout</Text>
            <TouchableOpacity style={CommonStyles.Btn} title="Logout"

onPress={()=>{
    signOut(getAuth())
    .then(()=>{
        setLoggedUser(null);
    })
    .catch((error) => console.log(error));

}}>
        <Text style={CommonStyles.BtnText}>Logout</Text>
      </TouchableOpacity>
        </View>
    );
};

const logoutStyles = StyleSheet.create({

    container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        width: 200,
        height: 40,
        marginTop: 20,
        fontSize: 16
    },
    textArea: {
            height:200
    },
    title: { 
        fontSize: 30,
        fontWeight: 'bold'
    }
});

 export default LogoutScreen