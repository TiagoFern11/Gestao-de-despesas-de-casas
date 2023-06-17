import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native"
import {  useState } from "react";


import { collection, deleteDoc, getDocs, getFirestore, query, doc, orderBy } from "firebase/firestore";
import { CommonStyles, PostStyles } from "../styles";

import { getAuth} from 'firebase/auth';



const PostListScreen = ({navigation}) =>{
    const [posts, setPosts] = useState([]);
        

navigation.addListener('focus',()=>{
        
        const postsRef = collection(getFirestore(),'posts');
        const q = query (postsRef, orderBy('creationDate', 'desc'));
        getDocs(q)
        .then((res) => {            //console.log(res.docs)
            const postsList = res.docs.map((doc) =>{
                return {...doc.data(),id: doc.id};
            });
            setPosts(postsList);
        })
        .catch((error) => console.log(error));
    
    });

    const renderPost=({item:post})=>{
        return(
        <View style={CommonStyles.postContainer}>
            <Text>Post #{post.id} - {post.title}</Text>
            <Text>{post.body.substring(0,50)}...</Text>
            <TouchableOpacity style={CommonStyles.botao} onPress={()=> {
                navigation.navigate("PostDetail", { postId:post.id}) }}>
                    <Text style={CommonStyles.BtnText}>Ver Detalhes</Text>
                </TouchableOpacity>
            <TouchableOpacity style={CommonStyles.botao_delete}
                onPress={() =>{
                    if(posts.userEmail === getAuth().currentUser.email){
                        Alert.alert('delete post', 'Are you sure ?', [
                            {
                                text: 'yes, delete it!',
                                onPress: () =>{
                                    const posts = collection(getFirestore(),'posts');
                                    const docRef= doc(postsRef, post.id);
                                    deleteDoc(docRef)
                                    .then(()=>{
                                        const filteredPosts = posts.filter((p) =>{
                                            return p.id !== posts.id;
                                        });
                                    })
                                    .catch((error) => console.log(error));
                                }
                            },
                            {
                                text: 'no, forget it!',
                                onPress: () =>{}
                            }
                        ])
                    }
                    else{
                        Alert.alert('You cannot delete this post!');
                    }
                }}
                >
                    <Text style={CommonStyles.BtnText}>Apagar Casa</Text>
                </TouchableOpacity>

        </View>
        )
    }
    return (
        <View style={CommonStyles.container}>
            {posts.length == 0 ?
            <ActivityIndicator size ="large" color="red" />
            :
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                />
        }

        </View>
      )
};

  export default PostListScreen