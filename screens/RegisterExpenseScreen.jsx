import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native"
import { CommonStyles } from "../styles";
import ExpenseContext from "../contexts/ExpenseContext";
import { getFirestore, setDoc, collection, doc } from "firebase/firestore"


const RegisterExpenseScreen = () => {
const [name, setName] = useState(""); // Variavel de estado
const [typology, setTypology] = useState("");
const [date_start, setDate_start] = useState("");
const [date_finish, setDate_finish] = useState("");
const [cost, setCost] = useState("");
const [provider, setProvider] = useState("");
const [expense, setCreatedExpense] = useState(ExpenseContext);

const form_clear = () => {
  setName("");
  setTypology("");
  setDate_start("");
  setDate_finish("");
  setCost("");
  setProvider("");
}

const registerExpensePress = () => {

  const expense = { name, typology, date_start, date_finish, cost, provider };

  const expenseRef = collection(getFirestore(), 'expenses');
  const docRef = doc(expenseRef, name);
setDoc(docRef, expense).then(() => {
    setCreatedExpense(expense);
    form_clear();
})
.catch((error) => setErrorMessage(error.message));
}


return (

<View style={CommonStyles.container}>
<Text style={CommonStyles.title}>Register Expense</Text>

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
  placeholder=" Date Start"
  style={CommonStyles.input}
  value={date_start}
  onChangeText={(val) => {
    setDate_start(val);
    }}
/>

<TextInput
  autoCapitalize="none"
  placeholder=" Date Finish"
  style={CommonStyles.input}
  value={date_finish}
  onChangeText={(val) => {
    setDate_finish(val);
    }}
/>

<TextInput
  autoCapitalize="none"
  placeholder=" Cost"
  style={CommonStyles.input}
  value={cost}
  onChangeText={(val) => {
    setCost(val);
    }}
/>

<TextInput
  autoCapitalize="none"
  placeholder=" Provider"
  style={CommonStyles.input}
  value={provider}
  onChangeText={(val) => {
    setProvider(val);
    }}
/>
<TouchableOpacity disabled={!name||!typology||!date_start||!date_finish||!cost||!provider} style={CommonStyles.BtnExpense} onPress={registerExpensePress}>
  <Text style={CommonStyles.BtnText}>Register Expense</Text>
</TouchableOpacity>
</View>

);

}


export default RegisterExpenseScreen