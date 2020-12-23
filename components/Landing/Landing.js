import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";

class Landing extends React.Component {
  handleSignUp = () => {
    // this.props.navigation.navigate("Signup");
  };

  handleLogin = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <View style={styles.container}>
        <Image 
          resizeMode={'contain'}
          source={require("../../assets/hh2.png")}  
          style={{width:"100%",top:120,height:290,resizeMode: 'stretch',position:"absolute"}} 
        />    
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
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
    backgroundColor: "#268c68",
    borderColor: "#268c77",
    borderWidth: 1,
    borderRadius: 5,
    width: 180,
    position : "absolute",
    bottom : 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Landing;
