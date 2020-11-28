import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Header, Icon, Avatar, Input } from "react-native-elements";
import {
  getCurrentUserData,
  createPost,
} from "../../../utils/Auth/Auth.service";
import Firebase from "../../../config/Firebase";

const CreatePost = (props) => {
  const [value, setValue] = useState("");
  const [loggedUserName, setLoggedUserName] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.displayName, user.uid);
        setLoggedUserName(user.displayName);
        setUserID(user.uid);
      } else {
        // User is signed out.
        // ...
      }
    });
  });

  const LeftIcon = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            // console.log("A Pressed!");
          }}
          style={{ marginLeft: 14 }}
        >
          <Icon name="pencil" type="evilicon" color="#fff" size={35} />
        </TouchableOpacity>
      </View>
    );
  };
  const RightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          const imgURL = "https://i.postimg.cc/fyx4WSzS/default-avatar.jpg;";
          createPost(loggedUserName, value, imgURL);
          props.navigation.navigate("PostFeed");
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
                {loggedUserName}
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
        <View style={{ marginTop: 20 }}>
          <Input
            placeholder="Share your thoughts here"
            onChangeText={(value) => setValue(value)}
            style={{ fontSize: 15, marginLeft: 10 }}
          />
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
