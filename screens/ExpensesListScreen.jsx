import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native"
import {  useState } from "react";


import { collection, deleteDoc, getDocs, getFirestore, query, doc, orderBy } from "firebase/firestore";
import { CommonStyles, PostStyles } from "../styles";

import { getAuth} from 'firebase/auth';



const ExpensesListScreen = ({navigation}) =>{
    const [expenses, setexpenses] = useState([]);
        

navigation.addListener('focus',()=>{
        
        const expensesRef = collection(getFirestore(),'expenses');
        const q = query (expensesRef);
        getDocs(q)
        .then((res) => {
            const expensesList = res.docs.map((doc) =>{
                return {...doc.data(),id: doc.id};
            });
            setexpenses(expensesList);
        })
        .catch((error) => console.log(error));
    
    });

    const renderExpense=({item:expense})=>{
        return(
        <View style={CommonStyles.postContainer}>
            <Text>Expense Name: {expense.name}</Text>
            {/* <Text>Date Start:   {expense.date_start}</Text> */}
            {/* <Text>Date finish:  {expense.date_finish}</Text> */}
            <Text>Provider:     {expense.provider}</Text>
            <Text>Typology:     {expense.typology}</Text>
            <Text>Cost:         {expense.cost}€</Text>
            <TouchableOpacity style={CommonStyles.botao_delete}
                onPress={() =>{

                    Alert.alert('delete house', 'Are you sure ?', [
                        {
                            text: 'yes, delete it!',
                            onPress: () =>{
                                const expensesRef = collection(getFirestore(),'expenses');
                                const docRef= doc(expensesRef, expense.id);
                                deleteDoc(docRef)
                                .then(()=>{
                                    const filteredexpenses = expenses.filter((p) =>{
                                        return p.id !== expense.id;
                                    });
                                    setexpenses(filteredexpenses);
                                })
                                .catch((error) => console.log(error));
                            }
                        },
                        {
                            text: 'no, forget it!',
                            onPress: () =>{}
                        }
                    ])
                }}
                >
                    <Text style={CommonStyles.BtnText}>Delete Expense</Text>
                </TouchableOpacity>

        </View>
        )
    }
    return (
        <View style={CommonStyles.container}>
            {expenses.length == 0 ?
            <ActivityIndicator size ="large" color="red" />
            :
            <FlatList
                data={expenses}
                renderItem={renderExpense}
                keyExtractor={(item) => item.id}
                />
        }

        </View>
      )
};

  export default ExpensesListScreen