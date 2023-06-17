import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native"
import {  useState } from "react";


import { collection, deleteDoc, getDocs, getFirestore, query, doc, orderBy } from "firebase/firestore";
import { CommonStyles} from "../styles";




const HouseListScreen = ({navigation}) =>{
    const [houses, sethouses] = useState([]);
        

navigation.addListener('focus',()=>{
        
        const housesRef = collection(getFirestore(),'houses');
        const q = query (housesRef);
        getDocs(q)
        .then((res) => {
            const housesList = res.docs.map((doc) =>{
                return {...doc.data(),id: doc.id};
            });
            sethouses(housesList);
        })
        .catch((error) => console.log(error));
    
    });
    

    const renderHouse=({item:house})=>{
        return(
        <View style={CommonStyles.postContainer}>
            <Text>House #{house.name} - {house.address}</Text>
            <Text>Tipo de habitação: {house.typology.substring(0,50)}</Text>
            <TouchableOpacity style={CommonStyles.botao} onPress={()=> {
                navigation.navigate("HouseDetail", { houseId:house.id}) }}>
                    <Text style={CommonStyles.BtnText}>Show Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={CommonStyles.botao} onPress={()=> {
                navigation.navigate("RegisterExpense") }}>
                    <Text style={CommonStyles.BtnText}>Register Expense</Text>
                </TouchableOpacity>
            <TouchableOpacity style={CommonStyles.botao_delete}
                onPress={() =>{
                    Alert.alert('delete house', 'Are you sure ?', [
                            {
                                text: 'yes, delete it!',
                                onPress: () =>{
                                    const housesRef = collection(getFirestore(),'houses');
                                    const docRef= doc(housesRef, house.id);
                                    deleteDoc(docRef)
                                    .then(()=>{
                                        const filteredhouses = houses.filter((p) =>{
                                            return p.id !== house.id;
                                        });
                                        sethouses(filteredhouses)
                                    })
                                    .catch((error) => console.log(error));
                                }
                            },
                            {
                                text: 'no, forget it!',
                                onPress: () =>{}
                            }
                        ])
                    
                    // if(houses.userEmail === getAuth().currentUser.email){
                    //     Alert.alert('delete house', 'Are you sure ?', [
                    //         {
                    //             text: 'yes, delete it!',
                    //             onPress: () =>{
                    //                 const houses = collection(getFirestore(),'houses');
                    //                 const docRef= doc(housesRef, house.id);
                    //                 deleteDoc(docRef)
                    //                 .then(()=>{
                    //                     const filteredhouses = houses.filter((p) =>{
                    //                         return p.id !== houses.id;
                    //                     });
                    //                 })
                    //                 .catch((error) => console.log(error));
                    //             }
                    //         },
                    //         {
                    //             text: 'no, forget it!',
                    //             onPress: () =>{}
                    //         }
                    //     ])
                    // }
                    // else{
                    //     Alert.alert('You cannot delete this post!');
                    // }
                }}
                >
                    <Text style={CommonStyles.BtnText}>Delete House</Text>
                </TouchableOpacity>

        </View>
        )
    }
    return (
        <View style={CommonStyles.container}>
            {/* <Text style={CommonStyles.title}>Expenses List</Text> */}
            <TouchableOpacity style={CommonStyles.BtnExpense}
            onPress={()=> { navigation.navigate("RegisterHouse") }}
            >
                    <Text style={CommonStyles.BtnText}>Register House</Text>
            </TouchableOpacity>

            {houses.length == 0 ?
            <ActivityIndicator size ="large" color="red" />
            :
            <FlatList
                data={houses}
                renderItem={renderHouse}
                keyExtractor={(item) => item.id}
                />
        }

        </View>
      )
};

export default HouseListScreen