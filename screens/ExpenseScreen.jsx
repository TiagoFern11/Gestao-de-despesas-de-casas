import { createStackNavigator } from "@react-navigation/stack";
import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native"
import { useEffect, useState } from "react";
import { commonStyles } from "../styles";
import ExpenseMenu from './ExpenseMenu';
import ExpensesListScreen from './ExpensesListScreen';
import RegisterExpenseScreen from './RegisterExpenseScreen';



const getDataAsync =async (endpoint, setPostsCallback) => {
    const raw =await fetch(endpoint)
    const json =await raw.json();
    setPostsCallback(json);
}

const Stack = createStackNavigator();
const ExpenseScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name ="ExpenseMenu" component={ExpenseMenu} 
            options ={{title:'Expenses'}}/>
            <Stack.Screen name ="ExpensesList" component={ExpensesListScreen} 
            // options ={{headerShown: false,}}
            />
            <Stack.Screen name ="RegisterExpense" component={RegisterExpenseScreen}
            options ={{title:'Register Expense'}}/>
        </Stack.Navigator>
    )
  }

  export default ExpenseScreen