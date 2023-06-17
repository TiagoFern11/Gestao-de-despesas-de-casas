import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native"
import {  useState } from "react";


import { collection, deleteDoc, getDocs, getFirestore, query, doc, orderBy } from "firebase/firestore";
import { CommonStyles, PostStyles } from "../styles";

import { getAuth} from 'firebase/auth';



const ExpenseMenu = ({navigation}) =>{
// const [houses, sethouses] = useState([]);
        

navigation.addListener('focus',()=>{});

return(
    <View style={CommonStyles.container}>

    <Text style={CommonStyles.title}>Expenses List</Text>
    <TouchableOpacity style={CommonStyles.BtnExpense}
      onPress={()=> { navigation.navigate("ExpensesList") }}
    >
            <Text style={CommonStyles.BtnText}>Show List</Text>
    </TouchableOpacity>

    <Text style={CommonStyles.title}>Register Expenses</Text>
    <TouchableOpacity style={CommonStyles.BtnExpense}
      onPress={()=> {navigation.navigate("RegisterExpense") }}
    >
            <Text style={CommonStyles.BtnText}>Register</Text>
    </TouchableOpacity>
    </View>
)
};

export default ExpenseMenu
