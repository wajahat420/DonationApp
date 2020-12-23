import React, { useState, useEffect, useContext } from "react";
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
import { MyContext } from "../../context/context";
import { uploadComment } from "../../utils/Auth/Auth.service";

const PostFeed = (props) => {
  const {cartOpened}  = useContext(MyContext)
  
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [posts, setPosts] = useState([]);
  const [userID, setUserID] = useState("")
  const [loggedUserName,setLoggedUserName] = useState("")
  const [comment, setComment] = useState("")

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    selectedIndex == 0 ? props.navigation.navigate("PostFeed") : null;
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

    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserID(user.uid);
        setLoggedUserName(user.displayName);
      } 
    });
  }, []);

  const filterCategory = (elem) => {
  
     return elem.category === cartOpened
     
  }
  

  // console.log("posts", posts);

  const getAllPosts = posts.filter(elem=>filterCategory(elem)).map((data) => {
  const comments = data.comments === undefined ? {} : data.comments 

    return (
      <>
        <View
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
                  uri: "https://i.postimg.cc/jS8fpDp4/default-avatar.jpg",
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
                  uri: "https://i.postimg.cc/BQtqwgFm/supporticon.jpg",
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
                const profilePicture = ""
                  return(
                    <View>
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
        {/* <ButtonGroup
          onPress={setCurrentCategory}
          selectedIndex={currentCategory}
          buttons={buttons}
          containerStyle={{ height: 35 }}
          selectedButtonStyle={{ backgroundColor: "#268c77" }}
        /> */}

        <ScrollView>
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
