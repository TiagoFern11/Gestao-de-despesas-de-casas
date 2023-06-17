import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from "react-native"

import { collection, getDoc, getFirestore, doc } from "firebase/firestore";
import {CommonStyles, PostStyles} from "../styles";


const PostDetailScreen = ({route, navigation}) =>{
    
    const {postId} = route.params;
    const [post, setPost] = useState(null);

    useEffect(()=>{
        
        const postsRef = collection(getFirestore(),'posts');
        const docRef= doc(postsRef, postId);
        getDoc(docRef)
        .then((res) => {
            setPost ({...res.data(),id: postId});
        })
        .catch((error) => console.log(error));
    
    },[]);

    const renderPost=({item:post})=>{
        return(
            
        <View style={CommonStyles.postContainer}>
            <Text>Post #{post.id} - {post.title}</Text>
            <Text>{post.body}</Text>
            <TouchableOpacity style={CommonStyles.botao} onPress={()=> {
                navigation.navigate("PostDetail", { postId:post.id}) }}>
                <Text style={CommonStyles.BtnText}>Ver Detalhes</Text>
            </TouchableOpacity>
        </View>
        )
    }
    return (
        <>
        {post &&
        <View style={CommonStyles.container}>
            <Text>Post #{post.id} - {post.title}</Text>
            <Text>{post.body}...</Text>
            <TouchableOpacity style={CommonStyles.botao} onPress={()=> {
                navigation.navigate("PostDetail", { postId:post.id}) }}>
                <Text style={CommonStyles.BtnText}>Ver Detalhes</Text>
            </TouchableOpacity>
        </View> }
        </>
      )
};

// const PostCommentScreen =({route}) =>{
//     const {postId}=route.params;
//     const [comments, setComments] = useState([]);

//     useEffect(()=> {
//         const endpoint = BASE_URL + postId+ '/comments'
//         getDataAsync(endpoint, setComments);
//     }, []);
//     return(
//         <View style={styles.PostContainer}>
//             <Text style={styles.title}>
//                 {comment.email}
//             </Text>
//             <Text>{comment.body}</Text>
//         </View>
//     )
// };


  export default PostDetailScreen