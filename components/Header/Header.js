import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Header, ButtonGroup } from "react-native-elements";

const NavHeader = (props) => {
  const { selectedIndex, updateIndex } = props;

  const balanceCardIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.history.navigate("Donation");
        }}
      >
        <View style={styles.balanceIcon}>
          <View>
            <Image
              style={{ width: 27, height: 29, marginRight: 5 }}
              source={{
                uri: "https://i.postimg.cc/8PmTtDrp/Card-Payment-512.png",
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>$0</Text>
            <Text style={{ color: "#737373", fontSize: 10 }}>Balance</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const LogoIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("A Pressed!");
        }}
      >
        <Image
          style={{ width: 35, height: 35 }}
          source={{
            uri: "https://i.postimg.cc/tRFv8Ntk/social-activities.png",
          }}
        />
      </TouchableOpacity>
    );
  };
  const buttons = ["Global", "Following", "Personal"];
  return (
    <>
      <View style={styles.container}></View>

      <Header
        placement="left"
        leftComponent={() => LogoIcon()}
        centerComponent={{ text: "Donate !", style: { color: "#000" } }}
        rightComponent={() => balanceCardIcon()}
        containerStyle={{
          backgroundColor: "#fff",
          justifyContent: "space-around",
          paddingBottom: 15,
          height: 65,
          elevation: 5,
        }}
      />
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 35 }}
        selectedButtonStyle={{ backgroundColor: "#268c77" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 10,
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },
  balanceIcon: {
    flexDirection: "row",
    width: 80,
    padding: 2,
    borderColor: "#e6e6e6",
    borderWidth: 1.3,
    borderRadius: 10,
    marginRight: 2,
    elevation: 1,
  },
});

export default NavHeader;
