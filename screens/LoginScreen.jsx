import { NavigationContainer } from "@react-navigation/native";

import { useContext, useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Image }

from "react-native"

import { CommonStyles } from "../styles";

import UserContext from "../contexts/UserContext";


import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { collection, getFirestore, setDoc, doc, getDoc } from "firebase/firestore";


const Login = ({ navigation }) => {

const [errorMessage, setErrorMessage] = useState("");

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");


const [loggedUser, setLoggedUser] = useContext(UserContext);


const loginPress = () => {

signInWithEmailAndPassword(getAuth(), email, password)	
.then((res) => {

const usersRef = collection(getFirestore(), 'users');
const docRef = doc(usersRef, email);

getDoc(docRef)
.then((doc) => {
    setLoggedUser(doc.data());
})
.catch((error) => setErrorMessage(error.message));

})

.catch((error) => {

console.log(error.message);

});

}


return (

<View style={CommonStyles.container}>
<Image

style={CommonStyles.logoImage}

source={require('../assets/images/logo.jpg')}

/> 
<Text style={CommonStyles.title}>Login</Text>

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

placeholder=" Password"

style={CommonStyles.input}

value={password}

onChangeText={(val) => {

setPassword(val);

setErrorMessage("");

}}

secureTextEntry={true}
/>
<TouchableOpacity disabled={!email||!password} style={CommonStyles.Btn} onPress={loginPress}>
        <Text style={CommonStyles.BtnText}>Login</Text>
      </TouchableOpacity>

<Text style={CommonStyles.error}>{errorMessage}</Text>

<TouchableOpacity style={CommonStyles.Btn} title="Register"

onPress={() => {

navigation.navigate("Register");

}}>
        <Text style={CommonStyles.BtnText}>Register</Text>
      </TouchableOpacity>

</View>

);

}


import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./RegisterScreen";

const Stack = createStackNavigator();

const LoginScreen = () => {

return (

<NavigationContainer>

<Stack.Navigator screenOptions={{ headerShown: false }}>

<Stack.Screen name="Login" component={Login} />

<Stack.Screen name="Register" component={RegisterScreen} />

</Stack.Navigator>

</NavigationContainer>

)

}


export default LoginScreen


