import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import NavHeader from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  Header,
  Icon,
  Input,
  Image,
  Avatar,
} from "react-native-elements";
import MainCarousel from "../Carousel/Carousel";
import Firebase from "../../config/Firebase";
import { uploadComment } from "../../utils/Auth/Auth.service";
const PostFeed = (props) => {
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("")
  const [userID, setUserID] = useState("")
  const [loggedUserName,setLoggedUserName] = useState("")

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    selectedIndex == 1 ? props.navigation.navigate("FollowingGroup") : null;
    selectedIndex == 2 ? props.navigation.navigate("Profile") : null;
  };

  useEffect(() => {
    var postFeeds = Firebase.database().ref("/posts");
    postFeeds.once("value").then((snapshot) => {
      const data = snapshot.val();
      var myData = []
      if(data != null){
        myData = Object.keys(data).map((key) => {
          let obj = data[key]
          obj["postID"] = key
          return obj;
        });
      }
      
      setPosts(myData);
    });
    var additional_info = Firebase.database().ref("/additional_info");


    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserID(user.uid);
        setLoggedUserName(user.displayName);
      } 
    });
  }, []);
   getProfileAndCoverURL = async(obj)=>{
    let profile_picture = ""
    var storageRef = Firebase.storage().ref();

    await storageRef.child('profile_pictures/'+obj.profile_picture).getDownloadURL().then(function(url) {
          profile_picture = url
    })
    // await storageRef.child('cover_pictures/'+obj.cover_picture).getDownloadURL().then(function(url) {
    //   cover_picture = url
    // })
    return profile_picture
  }
  const additional_info = async(id)=>{
    let profile_picture = ""
    Firebase.database().ref("/additional_info").once("value").then((snapshot) => {
      const data = snapshot.val();  

      Object.keys(data).forEach(elem=>{
        if(data[elem].userID == id){
          profile_picture =  getProfileAndCoverURL(data[elem])
          console.log("profile",profile_picture)

        }
      })
    });
    console.log("url",profile_picture)
    return profile_picture
  }

  const getAllPosts = posts.map((data,key) => {
    const comments = data.comments === undefined ? {} : data.comments 
    const profile_picture =  ""
    // const profile_picture = additional_info(data.userID)
    // console.log("check",profile_picture)
    return (
      <>
        <View
          key = {key}
          style={{
            borderColor: "#e6e6e6",
            paddingLeft: 20,
            marginTop: 10,
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <Avatar
                rounded
                size={25}
                source={{
                  uri: profile_picture,
                }}
              />
              <Text
                style={{
                  color: "#268c77",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 5,
                  paddingBottom: 5,
                }}
              >
                {data.username}
              </Text>
            </View>
          </View>

          <Text style={{ color: "#787878" }}>{data.textMsg}</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate("");
              }}
              style={{ marginLeft: 1, paddingBottom: 5 }}
            >
              <Image
                style={{ width: 15, height: 15, marginRight: 10 }}
                source={{
                  uri:
                    "https://i.postimg.cc/kXGpQtm3/206-2066210-thumb-up-icon-color-thumbs-up-like-icon-png.jpg",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate("");
              }}
              style={{ marginLeft: 1 }}
            >
              <Image
                style={{ width: 15, height: 15, marginRight: 10 }}
                source={{
                  uri: profile_picture,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate("");
              }}
              style={{ marginLeft: 1 }}
            >
              <Image
                style={{ width: 15, height: 15, marginRight: 10 }}
                source={{
                  uri: "https://i.postimg.cc/63Qq0NfQ/242127.png",
                }}
              />
            </TouchableOpacity>
          </View>
          {Object.keys(comments).map(key=>{
           const commentObj = comments[key]
            let profilePicture = null

            return(
              <View style={{
                // borderWidth:1,
                // borderColor:"gray",
                // borderRadius:10
              }}>
                <View style={{ flexDirection: "row" }}>
                  <Avatar
                    rounded
                    size={25}
                    source={{uri:`data:image/png;base64,${profilePicture}`}}  
                  /> 
                  <Text
                    style={{
                      color: "#268c77",
                      fontSize: 15,
                      fontWeight: "bold",
                      marginLeft: 5,
                      paddingBottom: 5,
                    }}
                  >
                    {commentObj.username}
                  </Text>
                </View>
                <Text style={{ color: "#787878" }}>{commentObj.comment}</Text>
              </View>
            )
          })}
          <View style={{ width: 330, position: "relative", right: 10 }}>
            <Input
              placeholder="Comment"
              leftIcon={
                <Icon
                  name="comment"
                  type="evilicon"
                  color="#737373"
                  size={25}
                  onPress ={()=>{
                    uploadComment(userID,data.postID,comment,loggedUserName)
                    window.location.reload(false)
                    
                  }}
                />
              }
              style={{ fontSize: 13 }}

              onChangeText={(value) => setComment(value)}
            />
          </View>
        </View>
      </>
    );
  });

  const LeftIcon = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("CreatePost");
          }}
          style={{ marginLeft: 25, paddingBottom: 5 }}
        >
          <Image
            style={{ width: 22, height: 22 }}
            source={{
              uri: "https://i.postimg.cc/vm28BnyH/simple-60-512.png",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const CenterIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("CreatePost");
        }}
        style={{ marginLeft: 0 }}
      >       
        <Text style={{ color: "#737373", fontSize: 16 }}>
          Share your thoughts or photos
        </Text>
      </TouchableOpacity>
    );
  };
  const history = props.navigation;
  // console.log("POSTS", posts);

  return (
    <>
      <View style={styles.container2}>
        <NavHeader
          history={history}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          updateIndex={updateIndex}
        />
        <Header
          placement="left"
          leftComponent={() => LeftIcon()}
          centerComponent={() => CenterIcon()}
          containerStyle={{
            backgroundColor: "#fff",
            justifyContent: "space-around",
            paddingBottom: 15,
            height: 55,
            elevation: 5,
          }}
        />

        <ScrollView>
          <MainCarousel />  
          <View>{getAllPosts}</View>
        </ScrollView>
        <Footer history={history} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PostFeed;
