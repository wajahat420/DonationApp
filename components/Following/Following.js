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
  ButtonGroup,
  Avatar,
} from "react-native-elements";
import MainCarousel from "../Carousel/Carousel";
import Firebase from "../../config/Firebase";
const PostFeed = (props) => {
  // props.navigation.navigate("Login")
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [posts, setPosts] = useState([]);
  const [currentCategory,setCurrentCategory] = useState(0)

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    selectedIndex == 0 ? props.navigation.navigate("PostFeed") : null;
    selectedIndex == 2 ? props.navigation.navigate("Profile") : null;
  };

  useEffect(() => {
    console.log("useEffect")
    var postFeeds = Firebase.database().ref("/posts");
    postFeeds.once("value").then((snapshot) => {
      const data = snapshot.val();
      console.log("data",data)
      myData = []
      if(data != null){
        var myData = Object.keys(data).map((key) => {
          return data[key];
        });
      }
      console.log("POSTS", myData);

      setPosts(myData);
    });
  }, []);
  const buttons = ["All", "Education", "Food","Donation"];

  const filterCategory = (elem) => {
    console.log("here")
    
    console.log("elem==",elem,elem.category,currentCategory)
     if(buttons[currentCategory] === "All"){
       return true
     }
     return buttons[currentCategory] === elem.category
     
  }
  

  // console.log("posts", posts);

  const getAllPosts = posts.filter(elem=>filterCategory(elem)).map((data) => {
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
          <View style={{ width: 330, position: "relative", right: 10 }}>
            <Input
              placeholder="Comment"
              leftIcon={
                <Icon
                  name="comment"
                  type="evilicon"
                  color="#737373"
                  size={25}
                />
              }
              style={{ fontSize: 13 }}

              // onChangeText={(value) => this.setState({ comment: value })}
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
        <ButtonGroup
          onPress={setCurrentCategory}
          selectedIndex={currentCategory}
          buttons={buttons}
          containerStyle={{ height: 35 }}
          selectedButtonStyle={{ backgroundColor: "#268c77" }}
        />

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
