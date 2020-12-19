import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image ,Alert} from "react-native";
import { Header, Icon, Avatar, Input } from "react-native-elements";
import {
  getCurrentUserData,
  createPost,
} from "../../../utils/Auth/Auth.service";
import Firebase from "../../../config/Firebase";

const CreatePost = (props) => {
  const [value, setValue] = useState("");
  const [loggedUser, setLoggedUserName] = useState();
  const [userID, setUserID] = useState();
  const [categories,setCategories] = useState(["Education","Food","Donation"])
  const [selectedCategory,setSelectedCategory] = useState("Category")
  const [displayCategory,setdisplayCategory] = useState("none")

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        setLoggedUserName(user.displayName);
        setUserID(user.uid);
      } 
    });
  });
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Missing..!",
      "Select Category Please",
      [
        {
          text: "Cancel",
          style: "cancel"
        }
        // { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  const LeftIcon = () => {
    return (
      <View style={{ flexDirection: "row" ,marginRight:100}}>
        <TouchableOpacity
          onPress={() => {
            const history = props.navigation
            history.navigate('PostFeed')
          }}
          style={{ marginLeft: 14 }}
        >
          <Icon name="arrow-back" type="Ionicons" color="#fff" size={25} />
        </TouchableOpacity>
      </View>
    );
  };
  const RightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if(selectedCategory === "Category" ){
            // console.log(selectedCategory)
            createTwoButtonAlert()
          }else{
            const imgURL = "https://i.postimg.cc/fyx4WSzS/default-avatar.jpg;";
            createPost(loggedUser,userID, value, imgURL,selectedCategory);
            props.navigation.navigate("PostFeed");
          }
        }} 
        style={{ marginRight: 14 }}
      >
        <Text style={{ color: "#fff" }}>POST</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}></View>
      <View style={styles.container2}>
        <Header
          placement="left"
          leftComponent={() => LeftIcon()}
          rightComponent={() => RightIcon()}
          containerStyle={{
            backgroundColor: "#268c77",
            justifyContent: "space-around",
            paddingBottom: 15,
            height: 55,
            elevation: 5,
          }}
        />
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", paddingLeft: 10, marginTop: 10 }}>
          <View>
            <Avatar
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <View>
              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: 16,
                  color: "#787878",
                  fontWeight: "bold",
                }}
              >
                {loggedUser}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingLeft: 10 }}>
              <View>
                <Image
                  style={{ width: 13, height: 13 }}
                  source={{
                    uri: "https://i.postimg.cc/8c3L1HXD/globe-01-512.png",
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    paddingLeft: 3,
                    fontSize: 10,
                    color: "#787878",
                  }}
                >
                  public
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20, display:"flex", flexDirection : "row" }}>
          <View style={{flex:1,marginTop : 12,marginLeft:5}}>
            <TouchableOpacity onPress={()=>setdisplayCategory(displayCategory == "none" ? "flex" : "none")}>
              <Text style={{paddingBottom:10,fontSize:13,textAlign:"center",borderColor:"gray",borderBottomWidth:1}}>{selectedCategory}</Text>
            </TouchableOpacity>
            {categories.map((elem,index)=>
              <TouchableOpacity onPress={()=>setSelectedCategory(elem)}>
                 <View style={{display:displayCategory}}>
                   <Text 
                     style={{
                      display:selectedCategory == elem ? "none" : "flex",
                      padding:0,
                      paddingBottom:10,
                      paddingTop:6,
                      fontSize:13,
                      textAlign:"center",
                      borderColor:"gray",
                      borderBottomWidth:1
                    }}
                     key={index}
                     >
                       {elem}
                   </Text>

                </View> 
              </TouchableOpacity>
            )}
          </View> 
          <View style={{flex:5,  margin: 0}}>
            <Input
              placeholder="Share your thoughts here"
              onChangeText={(value) => setValue(value)}
              style={{ fontSize: 15, flex: 1,margin:0 }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container2: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#000",
    padding: 10,
  },
});

export default CreatePost;
