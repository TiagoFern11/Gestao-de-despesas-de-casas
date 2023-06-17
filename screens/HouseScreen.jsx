import { createStackNavigator } from "@react-navigation/stack";
import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native"
import { useEffect, useState } from "react";
import HouseListScreen from "./HouseListScreen";
import HouseDetailScreen from "./HouseDetailScreen";
import { commonStyles } from "../styles";

import RegisterHouseScreen from './RegisterHouseScreen';

const getDataAsync =async (endpoint, setPostsCallback) => {
    const raw =await fetch(endpoint)
    const json =await raw.json();
    setPostsCallback(json);
}

const Stack = createStackNavigator();
const HouseScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name ="HouseList" component={HouseListScreen} 
            options ={{title:'Houses'}}/>
            <Stack.Screen name ="HouseDetail" component={HouseDetailScreen}
            options ={{title:'House Detail'}}/>
            <Stack.Screen name ="RegisterHouse" component={RegisterHouseScreen}
            options ={{title:'Register House'}}/> 
        </Stack.Navigator>
    )
  }

  export default HouseScreen