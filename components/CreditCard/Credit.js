import React from "react";
import { View, StyleSheet, Text } from "react-native";

class Credit extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Credit Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Credit;
