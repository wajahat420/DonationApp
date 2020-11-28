import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Header } from "react-native-elements";
import { Switch } from "react-native";

// import { Button } from "react-native-elements";
// import { Switch } from "react-native-gesture-handler";
class AddFunds extends React.Component {
  render() {
    const LogoIcon = () => {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log("Donate.js");
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

    const righticon = () => {
      return <Switch></Switch>;
    };
    return (
      <>
        <Header
          style={styles.Header}
          leftComponent={{ icon: "left", color: "#fff" }}
          centerComponent={{ text: "ADD FUNDS", style: { color: "#fff" } }}
          rightComponent={{ icon: "user", type: "entypo", color: "#fff" }}
          containerStyle={{
            backgroundColor: "#268c77",
          }}
        />

        {/* <View style={styles.maincontainer}> */}
        <View style={styles.balancecontainer}>
          <Header
            placement="left"
            leftComponent={() => LogoIcon()}
            centerComponent={{ text: "Charity App", style: { color: "#000" } }}
            containerStyle={{
              backgroundColor: "#fff",
              justifyContent: "space-around",
              paddingBottom: 15,
              height: 65,
            }}
          />
          {/* <View>
    <Image  style={styles.balanceIcon}
          style={{ width: 35, height: 35 }}
          source={{
            uri: "https://i.postimg.cc/tRFv8Ntk/social-activities.png", 
          }}
          
        />
       <Text style={styles.balance}>   Current balance</Text>
       </View> */}
        </View>

        {/* <TextInput style={styles.input} */}

        <View style={styles.input}>
          <Text style={styles.Text1}>Enter Amount</Text>
          <Text style={styles.Fontsize}>
            $
            <TextInput style={styles.inputbox} />
          </Text>
        </View>

        {/* <View>
  <Text>Fund Monthly</Text>
</View> */}
        {/* <View>
<Button style={styles.Button}
  title="Outline button"
  type="outline"
/>
</View> */}

        <View>
          <Header
            placement="left"
            rightComponent={() => righticon()}
            centerComponent={{
              text: "Fund Monthly",
              style: { color: "#000", fontWeight: "bold" },
            }}
            containerStyle={{
              backgroundColor: "#fff",
              justifyContent: "space-around",
              paddingBottom: 15,
              height: 65,
            }}
          />
          <View style={styles.touchbutton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("AddFunds");
              }}
            >
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>

          {/* <Header style={styles.Header1}
       placement="left"
      leftComponent={{ text: "Fund Monthly", style: { color: 'black', fontSize: 25, fontWeight: "bold" } }}
     rightComponent={{ icon: 'switch', color: 'black'}}
    
      containerStyle={{
        backgroundColor: 'green',
       height: 110,
          }}
          />
    <Switch/> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Header: {
    padding: "50",
    alignItems: "center",
    justifyContent: "center",
  },
  Header1: {
    width: "100",
  },
  balance: {
    alignContent: "center",
    fontSize: 20,
    backgroundColor: "white",
    fontWeight: "bold",
  },
  touchbutton: {
    alignItems: "center",
  },
  // maincontainer:{
  //   backgroundColor: "#D3D3D3",
  //   // flex : 5
  //     },
  // balancecontainer:{
  //   backgroundColor: "#FFFFFF",

  //     },

  button: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#268c77",
    borderColor: "#268c77",
    width: 280,
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
  Text1: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    // backgroundColor: "#D3D3D3",
  },
  maincontainer: {
    backgroundColor: "#D3D3D3",
  },
  // Button: {
  //   // width: 300,
  //   alignItems: 'center',
  // },
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
  input: {
    // margin: 15,
    // height: 40,
    // borderColor: '#7a42f4',
    //  borderWidth: 30,
    //  justifyContent: "botom",
    alignItems: "center",
    flex: 80,
    // width: 30,
    backgroundColor: "#D3D3D3",
  },
  Fontsize: {
    fontSize: 25,
    fontWeight: "bold",
    paddingRight: 5,
  },
  inputbox: {
    borderColor: "black",
    borderWidth: 1,
    padding: 16,
    // paddingTop: 16,
    // paddingBottom: 16,
    // paddingLeft: 60,
    // paddingRight: 60,
    textAlign: "center",
    margin: 10,
    backgroundColor: "white",
    fontSize: 26,
    borderRadius: 5,
    paddingVertical: 10,
  },
});

export default AddFunds;
