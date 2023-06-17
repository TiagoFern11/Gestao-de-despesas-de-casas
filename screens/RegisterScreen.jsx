import { useContext, useState } from "react";

import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity }

from "react-native"

import { CommonStyles } from "../styles";

import UserContext from "../contexts/UserContext";


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, setDoc, collection, doc } from "firebase/firestore"


const RegisterScreen = ({ navigation }) => {

const [errorMessage, setErrorMessage] = useState("");

const [email, setEmail] = useState("");

const [name, setName] = useState("");

const [bio, setBio] = useState("");

const [password, setPassword] = useState("");

const [passwordConfirm, setPasswordConfirm] = useState("");


const [loggedUser, setLoggedUser] = useContext(UserContext);


const registerPress = () => {

if (password === passwordConfirm) {

createUserWithEmailAndPassword(getAuth(), email, password)

.then((res) => {

const user = { name, email, bio, id: res.user.uid };

const usersRef = collection(getFirestore(), 'users');
const docRef = doc(usersRef, email);
setDoc(docRef, user).then(() => {
    setLoggedUser(user);
})
.catch((error) => setErrorMessage(error.message));

})

.catch((error) => {

setErrorMessage(error.message);

console.log('error', error);

});

}

else {

setErrorMessage('Passwords do not match!');

}

}


return (

<View style={CommonStyles.container}>
<Text style={CommonStyles.title}>Register</Text>

<TextInput

autoCapitalize="none"

placeholder=" Name"

style={CommonStyles.input}

value={name}

onChangeText={(val) => {

setName(val);

setErrorMessage("");

}}

/>

<TextInput

autoCapitalize="none"

placeholder=" Email"

style={CommonStyles.input}

value={email}

onChangeText={(val) => {

setEmail(val);

setErrorMessage("");

}}

/>

<TextInput

autoCapitalize="none"

placeholder=" Bio"

style={CommonStyles.input}

value={bio}

onChangeText={(val) => {

setBio(val);

setErrorMessage("");

}}

/>

<TextInput

autoCapitalize="none"

placeholder=" Password"

style={CommonStyles.input}

value={password}

onChangeText={(val) => {

setPassword(val);

setErrorMessage("");

}}

secureTextEntry={true}

/>

<TextInput

autoCapitalize="none"

placeholder=" Confirm password"

style={CommonStyles.input}

value={passwordConfirm}

onChangeText={(val) => {

setPasswordConfirm(val);

setErrorMessage("");

}}

secureTextEntry={true}

/>
<TouchableOpacity disabled={!name||!email||!bio||!password||!passwordConfirm} style={CommonStyles.Btn} onPress={registerPress}>
        <Text style={CommonStyles.BtnText}>Register</Text>
      </TouchableOpacity>
{/* <Button onPress={registerPress} title="Submit" /> */}


{/* <Button

title="Login"

onPress={() => {

navigation.navigate("Login");

}}

/> */}
<TouchableOpacity style={CommonStyles.Btn} onPress={() => {
navigation.navigate("Login");
}}>
        <Text style={CommonStyles.BtnText}>Login</Text>
      </TouchableOpacity>

<Text style={CommonStyles.error}>{errorMessage}</Text>

</View>

);

}


export default RegisterScreen