import 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as firebase from './firebase.config';

// import
import PostScreen from './screens/PostScreen';
import HouseScreen from './screens/HouseScreen';
import HomeScreen from './screens/HomeScreen';
import LogoutScreen from './screens/LogoutScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserContext from './contexts/UserContext';
import LoginScreen from './screens/LoginScreen';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import RegisterScreen from './screens/RegisterScreen';
import RegisterExpenseScreen from './screens/RegisterExpenseScreen';
import RegisterHouseScreen from './screens/RegisterHouseScreen';
import ExpensesListScreen from './screens/ExpensesListScreen';
import ExpenseScreen from './screens/ExpenseScreen';


const Tab = createBottomTabNavigator();

export default function App (){

  const [loggedUser, setLoggedUser] = useState (null);
  useEffect(()=>{
    onAuthStateChanged(getAuth(),(user)=>{
      if(user!= null){
        const usersRef = collection(getFirestore(), 'users')
        const docRef = doc(usersRef, user.email);
        getDoc(docRef)
        .then((doc)=>{
          setLoggedUser(doc.data());
        })
        .catch((error) => console.log(error));
      }
      
    });
  }, []);

  return(
    <UserContext.Provider value = {[loggedUser, setLoggedUser]}>
      {!loggedUser ?
      <LoginScreen/>
      :
    <NavigationContainer>
      <Tab.Navigator
      screenOptions = {({route}) => ({
        tabBarIcons: ({focused,color,size}) =>{
          let iconName;
          if (route.name === "home"){
            iconName = focused ? "home" : "ios-home";
          }
          if (route.name === "Houses"){
            iconName = focused ? "pricetags" : "ios-pricetags";
          }
          return <Ionicons name={iconName} size={size} color={color}/>
        },
      })}
        tabBarOptions={{
          activeTitleColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        
      <Tab.Screen name ="Home" component={HomeScreen} 
        options={{
          //headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="briefcase" color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen name ="Houses" component={HouseScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="home" color={color} size={size}/>
          )
        }}
      />
      {/* <Tab.Screen name ="Register House" component={RegisterHouseScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="home" color={color} size={size}/>
          )
        }}
      /> */}
      <Tab.Screen name ="Expenses" component={ExpenseScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="pricetags" color={color} size={size}/>
          )
        }}
      />
      {/* <Tab.Screen name ="Expenses List" component={ExpensesListScreen}
        options={{
          //headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="list" color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen name ="Register Expense" component={RegisterExpenseScreen} 
        options={{
          //headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="pricetags" color={color} size={size}/>
          )
        }}
      /> */}
      <Tab.Screen name ="Profile" component={ProfileScreen} 
        options={{
          //headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="person" color={color} size={size}/>
          )
        }}
      />
      <Tab.Screen name ="Logout" component={LogoutScreen}
        options={{
          //headerShown: false,
          tabBarIcon: ({color, size}) =>(
            <Ionicons name ="settings-sharp" color={color} size={size}/>
          )
        }}
      />
      
      {/* <Tab.Screen options={{headerShown: false}} name ="Houses" component={HouseScreen}/> */}
      {/* <Tab.Screen options={{headerShown: false}} name ="Post" component={PostScreen}/> */}
      {/* <Tab.Screen name ="Profile" component={ProfileScreen}/> */}
      {/* <Tab.Screen name ="Register House" component={RegisterHouseScreen}/> */}
      {/* <Tab.Screen name ="Register Expense" component={RegisterExpenseScreen}/> */}
      {/* <Tab.Screen name ="Expenses List" component={ExpensesListScreen}/> */}
      {/* <Tab.Screen name ="Logout" component={LogoutScreen}/> */}
      </Tab.Navigator>
    </NavigationContainer>
}
</UserContext.Provider>
  )
}