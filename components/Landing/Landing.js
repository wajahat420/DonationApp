import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Landing extends React.Component {
  handleSignUp = () => {
    this.props.navigation.navigate("Signup");
  };

  handleLogin = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Landing Screen</Text>
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
  },

  button: {
    marginTop: 30,
    marginLeft: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#268c77",
    borderColor: "#268c77",
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Landing;
