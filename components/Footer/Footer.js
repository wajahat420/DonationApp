import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Header, Icon } from "react-native-elements";

const Footer = (props) => {
  const LeftIcon = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            console.log("A Pressed!");
          }}
          style={{ marginLeft: 15 }}
        >
          <Image
            style={{ width: 22, height: 22 }}
            source={{
              uri: "https://i.postimg.cc/NjL0mb0v/images.png",
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
          console.log("A Pressed!");
        }}
        style={{ marginLeft: 95 }}
      >
        <Image
          style={{ width: 24, height: 22 }}
          source={{
            uri: "https://i.postimg.cc/tCWkytby/download.png",
          }}
        />
      </TouchableOpacity>
    );
  };

  const RightIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.history.navigate("Profile");
        }}
        style={{ marginRight: 14 }}
      >
        <Image
          style={{ width: 24, height: 22 }}
          source={{
            uri:
              "https://i.postimg.cc/T2m2RZ5S/77-776489-facade-empresa-computer-icons-business-vector-graphics-transparent.png",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={() => LeftIcon()}
        centerComponent={() => CenterIcon()}
        rightComponent={() => RightIcon()}
        containerStyle={{
          backgroundColor: "#fff",
          justifyContent: "space-around",
          paddingBottom: 15,
          height: 50,
          elevation: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});

export default Footer;
