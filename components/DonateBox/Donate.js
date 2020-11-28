import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity, Image } from "react-native";
import { Header } from "react-native-elements";
import { Icon } from "react-native-elements";
import { Button } from "react-native-elements";
class Donation extends React.Component {
  render() {
    const LogoIcon = () => {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log("A Pressed!");
          }}
        >
          <Image
            style={{ width: 35, height: 35, marginBottom: 20 }}
            source={{
              uri: "https://i.postimg.cc/tRFv8Ntk/social-activities.png",
            }}
          />
        </TouchableOpacity>
      );
    };
    return (
      <>
        <Header
          style={styles.Header}
          leftComponent={{ icon: "ei-left", type: "chevron", color: "#fff" }}
          centerComponent={{ text: "PAYMENT METHOD", style: { color: "#fff" } }}
          rightComponent={{ icon: "user", type: "entypo", color: "#fff" }}
          containerStyle={{
            backgroundColor: "#268c77",
            // marginBottom: 20
          }}
        />
        <View style={styles.maincontainer}>
          {/* <Text style={styles.balance}> Balance</Text> */}
          <Header
            placement="left"
            leftComponent={() => LogoIcon()}
            centerComponent={{
              text: "Charity balacne",
              style: { color: "#000", marginBottom: 20 },
            }}
            containerStyle={{
              backgroundColor: "#D3D3D3",
              justifyContent: "space-around",
              height: 55,
              // paddingBottom: 10
            }}
          />

          <View style={styles.maincontainer2}>
            <Text style={styles.money}> $00.00</Text>
            <View style={styles.touchbutton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate("AddFunds");
                }}
              >
                <Text style={styles.buttonText}>Add Funds</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Icon
                name="refresh"
                // type='fontawesome'
                color="#517fa4"
                size={60}
              />
              <Text style={styles.Fund}>Fund monthly</Text>
            </View>
          </View>
          <Text style={styles.otherpayment}> Other payment Method</Text>
        </View>
        {/* <Text style={styles.addpayment}> Add payment Method</Text>   */}
        <View style={styles.addpayment}>
          <Button
            title="Add Payment Method"
            type="clear"
            onPress={() => this.props.navigation.navigate("")}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  // Header: {

  //  padding: "50",
  //   alignItems: "center",
  //   justifyContent: "center",

  // },
  money: {
    margin: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
  // balance: {
  //   margintop:20,
  //   marginBottom:5,
  //   textAlign: 'left',
  //   fontSize: 20,
  //   backgroundColor: "white"
  // },
  otherpayment: {
    margin: 30,
    fontSize: 20,
    marginBottom: 20,
    textAlign: "left",
    paddingLeft: 35,
  },
  addpayment: {
    margin: 25,
    textAlign: "left",
    fontSize: 20,
    color: "red",
  },
  touchbutton: {
    alignItems: "center",
  },
  Fund: {
    margin: 20,
    textAlign: "center",
    fontSize: 20,
  },

  button: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#268c77",
    borderColor: "#268c77",
    width: 230,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    padding: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  maincontainer: {
    backgroundColor: "#D3D3D3",
  },
  maincontainer2: {
    backgroundColor: "#FFFFFF",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});
export default Donation;
