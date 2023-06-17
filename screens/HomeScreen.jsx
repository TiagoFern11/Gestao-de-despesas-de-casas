import { View, Text, Image, StyleSheet,Button } from "react-native"
import { getAuth, signOut } from 'firebase/auth';
import { useContext, useState } from "react";

import UserContext from "../contexts/UserContext";

const HomeScreen = () => {
  const [loggedUser, setLoggedUser] = useContext(UserContext);
    return (
      <View style={[styles.body, commonStyles.center]}>
        <Text style={commonStyles.title}>Welcome {loggedUser.name}</Text>
      </View>
    )
  };

  export default HomeScreen

  const commonStyles = StyleSheet.create({
    center: {
    justifyContent: 'center',
    alignItems: 'center'
    },
    profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100
    },
    title: {
    fontWeight: 'bold',
    fontSize: 30
    },
    
    description: {
    fontSize: 18,
    textAlign: 'justify'
    },
    whiteText: {
    color: 'white',
    fontSize: 16
    }
    
    })
    
    const styles = StyleSheet.create({
        header: {
        flex: 4
        },
        body: {
        flex: 4,
        backgroundColor: '#D8D8D8',
        padding: 20
       },
        footer: {
        flex: 1,
        flexDirection: 'row'
        }
    });
    
    const bodyStyles = StyleSheet.create({
        description: {
            marginTop: 50
        }
    })