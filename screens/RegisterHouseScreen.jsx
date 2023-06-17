import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native"
import { CommonStyles } from "../styles";
import HouseContext from "../contexts/HouseContext";
import { getFirestore, setDoc, collection, doc } from "firebase/firestore"


const RegisterHouseScreen = () => {
const [name, setName] = useState(""); // Variavel de estado
const [typology, setTypology] = useState("");
const [address, setAddress] = useState("");
const [const_start, setConst_start] = useState("");
const [const_finish, setConst_finish] = useState("");
const [house, setCreatedHouse] = useState(HouseContext);

const form_clear = () => {
  setName("");
  setTypology("");
  setAddress("");
  setConst_start("");
  setConst_finish("");
}

const registerHousesPress = () => {

  const house = { name, typology, address, const_start, const_finish };

  const houseRef = collection(getFirestore(), 'houses');
  const docRef = doc(houseRef);
setDoc(docRef, house).then(() => {
    setCreatedHouse(house);
    form_clear();
})
.catch((error) => setErrorMessage(error.message));


}


return (

<View style={CommonStyles.container}>
<Text style={CommonStyles.title}>Register House</Text>

<TextInput
  autoCapitalize="none"
  placeholder=" Name"
  style={CommonStyles.input}
  value={name}
  onChangeText={(val) => {
    setName(val);
    }}
/>

<TextInput
  autoCapitalize="none"
  placeholder=" Typology"
  style={CommonStyles.input}
  value={typology}
  onChangeText={(val) => {
    setTypology(val);
    }}
/>

<TextInput
  autoCapitalize="none"
  placeholder=" Address"
  style={CommonStyles.input}
  value={address}
  onChangeText={(val) => {
    setAddress(val);
    }}
/>

<TextInput
  autoCapitalize="none"
  placeholder=" Date Start"
  style={CommonStyles.input}
  value={const_start}
  onChangeText={(val) => {
    setConst_start(val);
    }}
/>

<TextInput
  autoCapitalize="none"
  placeholder=" Date Finish"
  style={CommonStyles.input}
  value={const_finish}
  onChangeText={(val) => {
    setConst_finish(val);
    }}
/>
<TouchableOpacity disabled={!name||!typology||!address||!const_start||!const_finish} style={CommonStyles.Btn} onPress={registerHousesPress
    }>
        <Text style={CommonStyles.BtnText}>Register House</Text>
      </TouchableOpacity>
</View>

);

}


export default RegisterHouseScreen