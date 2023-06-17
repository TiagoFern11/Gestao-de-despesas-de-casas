import { View, Text, Image, StyleSheet, Button, TouchableOpacity, TextInput } from "react-native"
import { getAuth } from "firebase/auth"
import { getFirestore, setDoc, collection, doc } from "firebase/firestore"
import { useContext, useState } from "react";

import UserContext from "../contexts/UserContext";

import { CommonStyles } from "../styles";


export default function Profile() {
  
  const [name, setName] = useState(""); // Variavel de estado
  
  const [bio, setBio] = useState("");

  const [loggedUser, setLoggedUser] = useContext(UserContext);
  
  
  const form_clear = () => {
    setName("");
    setBio("");
  }

  const profileEditePress = () => {
      
          const user = {...loggedUser, name, bio}; // Operador Spread
      
      const usersRef = collection(getFirestore(), 'users');
      const docRef = doc(usersRef,loggedUser.email);
      setDoc(docRef, user).then(() => {
          setLoggedUser(user);
    form_clear();
})
.catch((error) => setErrorMessage(error.message));
  }
return (

<View style={{ flex: 1 }}>

<View style={[styles.header, commonStyles.center]}>

<Image

style={commonStyles.profileImage}

source={require('../assets/images/users/profile.jpg')}

/> 

</View>

<View style={[styles.body, commonStyles.center]}>
      <Text style={commonStyles.title}>Name: {loggedUser.name}</Text>
      <TextInput

autoCapitalize="none"

placeholder=" New Name"

style={CommonStyles.input}

value={name}

onChangeText={(val) => {

setName(val);

}}

/>
      <Text style={[commonStyles.description, bodyStyles.description]}>
      Bio: {loggedUser.bio}</Text>
      <TextInput

autoCapitalize="none"

placeholder=" New Bio"

style={CommonStyles.input}

value={bio}

onChangeText={(val) => {

setBio(val);

}}

/>
      <TouchableOpacity disabled={!name&&!bio} style={CommonStyles.Btn} onPress={profileEditePress}>
      <Text style={CommonStyles.BtnText}>Save Changes</Text>
    </TouchableOpacity>
      </View>
      
  </View>
);
}

const commonStyles = StyleSheet.create({
center: {
justifyContent: 'center',
alignItems: 'center',
marginTop: 10,
},
profileImage: {
height: 200,
width: 200,
borderRadius: 100
},
title: {
fontWeight: 'bold',
fontSize: 30,
marginTop:-20,
},

description: {
fontSize: 18,
textAlign: 'justify',
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

 },
  footer: {
  flex: 1,
  flexDirection: 'row'
  }
});

const bodyStyles = StyleSheet.create({
  description: {
      marginTop: 20,
  }
});