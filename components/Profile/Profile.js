import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import NavHeader from "../Header/Header";
import Footer from "../Footer/Footer";

const Profile = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(2);

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    selectedIndex == 1 ? props.navigation.navigate("FollowingGroup") : null;
    selectedIndex == 0 ? props.navigation.navigate("PostFeed") : null;
  };
  const history = props.navigation;

  return (
    <>
      <View style={styles.container2}>
        <NavHeader
          history={history}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          updateIndex={updateIndex}
        />
        <Text>Profile Screen</Text>
        <Footer history={history} />
      </View>
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
});

export default Profile;
