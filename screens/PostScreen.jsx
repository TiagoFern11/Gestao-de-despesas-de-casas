import { createStackNavigator } from "@react-navigation/stack";
import { View, Button, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native"
import { useEffect, useState } from "react";
import PostListScreen from "./PostListScreen";
import PostDetailScreen from "./PostDetailScreen";
import PostCommentScreen from "./PostCommentScreen";
import { CommonStyles } from "../styles";

import HouseListScreen from "./HouseListScreen";
import HouseDetailScreen from "./HouseDetailScreen";

const BASE_URL ='https://jsonplaceholder.typicode.com/posts/'

const getDataAsync =async (endpoint, setPostsCallback) => {
    const raw =await fetch(endpoint)
    const json =await raw.json();
    setPostsCallback(json);
}

// const PostListScreen = ({navigation}) =>{
//     const [posts, setPosts] = useState([]);

//     useEffect(()=>{getDataAsync(BASE_URL,setPosts);},[]);

//     const renderPost=({item:post})=>{
//         return(
//         <View style={StyleSheet.postContainer}>
//             <Text>Post #{post.id} - {post.title}</Text>
//             <Text>{post.body.substring(0,50)}...</Text>
//             <Button titlle="Tap to see detail"onPress={()=> {
//                 navigation.navigate("PostDetail", { postId:post.id})
//             }}/>
//         </View>
//         )
//     }
//     return (
//         <View style={StyleSheet.container}>
//             {posts.length == 0 ?
//             <ActivityIndicator size ="large" color="blue"/>
//             :
//             <FlatList
//                 data={posts}/>
//         }

//         </View>
//       )
// };


// const PostDetailScreen =({navigation, route}) =>{
//     const {postId} = route.params;
//     const {post, setPost} = useState(null);

//     useEffect(()=> {
//         getDataAsync(BASE_URL + postId, setPost);
//     }, []);
//     return(
//         <View style={CommonStyles.container}>
//             <Text>Post #{posts.id} - {posts.title}</Text>
//             <Text>{posts.body.substring(0,50)}...</Text>
//             <Button titlle="Tap to see detail"onPress={()=> {
//                 navigation.navigate("PostDetail", { postId:posts.id})
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

// const Stack = createStackNavigator();
// const PostScreen = () => {
//     return(
//         <Stack.Navigator>
//             <Stack.Screen name ="PostList" component={PostListScreen} 
//             options ={{title:'Post'}}/>
//             <Stack.Screen name ="PostDetail" component={PostDetailScreen}
//             options ={{title:'Post Detail'}}/>
//             <Stack.Screen name ="PostComments" component={PostCommentScreen}
//             options ={{title:'Post Comments'}}/>
//         </Stack.Navigator>
//     )
//   }


  const Stack = createStackNavigator();
  const PostScreen = () => {
      return(
          <Stack.Navigator>
              <Stack.Screen name ="HouseList" component={HouseListScreen} 
              options ={{title:'House'}}/>
              <Stack.Screen name ="HouseDetail" component={HouseDetailScreen}
              options ={{title:'House Detail'}}/>
              <Stack.Screen name ="PostComments" component={PostCommentScreen}
              options ={{title:'Post Comments'}}/>
          </Stack.Navigator>
      )
    }


  export default PostScreen