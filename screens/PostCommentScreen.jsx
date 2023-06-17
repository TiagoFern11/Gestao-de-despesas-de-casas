import { createStackNavigator } from "@react-navigation/stack";
import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native"
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";



const PostCommentScreen =({route}) =>{
    const {postId}=route.params;
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        //getDataAsync(BASE_URL,setPosts);
        
        const commentsRef = collection(getFirestore(),'coomments');
        const q = query (commentsRef, where('postId','==',postId));
        getDocs(q)
        .then((res) => {
            const commentsList = res.docs.map((doc) =>{
                return {...doc.data(),id: doc.id};
            });
            setComments(commentsList);
        })
        .catch((error) => console.log(error));
    
    },[]);

    const renderPost=({item:post})=>{
        return(
        <View style={StyleSheet.postContainer}>
            <Text>Post #{post.id} - {post.title}</Text>
            <Text>{post.body.substring(0,50)}...</Text>
            <Button titlle="Tap to see detail"onPress={()=> {
                navigation.navigate("PostDetail", { postId:post.id})
            }}/>
        </View>
        )
    }
    return (
        <View style={StyleSheet.container}>
            {posts.length == 0 ?
            <ActivityIndicator size ="large" color="blue"/>
            :
            <FlatList
                data={posts}/>
        }

        </View>
      )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20  
    },
    postContainer: {
        backgroundColor: 'white',
        borderWidth:1,
        marginTop:20,
        padding:20
    },
    title: {
        fontWeight:'bold'
    }
})

// const PostDetailScreen =({navigation, route}) =>{
//     const {postId} = route.params;
//     const {post, setPost} = useState(null);

//     useEffect(()=> {
//         getDataAsync(BASE_URL + postId, setPost);
//     }, []);
//     return(
//         <View style={Styles.Container}>
//             <Text>Post #{post.id} - {post.title}</Text>
//             <Text>{post.body.substring(0,50)}...</Text>
//             <Button titlle="Tap to see detail"onPress={()=> {
//                 navigation.navigate("PostDetail", { postId:post.id})
//             }}/>
//         </View>
//     )
// }
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

const Stack = createStackNavigator();
const PostScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name ="PostList" component={PostListScreen} 
            options ={{title:'Post'}}/>
            <Stack.Screen name ="PostDetail" component={PostDetailScreen}
            options ={{title:'Post Detail'}}/>
            <Stack.Screen name ="PostComments" component={PostCommentScreen}
            options ={{title:'Post Comments'}}/>
        </Stack.Navigator>
    )
  }

  export default PostScreen