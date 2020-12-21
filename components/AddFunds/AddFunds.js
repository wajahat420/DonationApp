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
import { Icon } from "react-native-elements";
import { Dimensions } from 'react-native';
import { Alert } from "react-native";
import { MyContext } from "../../context/context";

// import { Button } from "react-native-elements";
// import { Switch } from "react-native-gesture-handler";
class AddFunds extends React.Component {
  constructor({navigation}){
    super()
    this.history = navigation
  }
  static contextType = MyContext
  state = {
    showPaymentMethod : false,
    showCreditCardNo : false,
    amount : 400,
    creditCardNo : ""
  }
  render() {
    const {updateAmount} = this.context
    const windowWidth = Dimensions.get('window').width;
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
    const LeftIcon = () =>{
      return(
        <View>
           <TouchableOpacity
           onPress={() => {
            this.props.navigation.navigate("Donation");
          }}
           >
             <Icon name="arrow-back" type="Ionicons" color="#fff" size={25} />
             

           </TouchableOpacity>

        </View>
      )
    }

    let showCreditCardNo = this.state.showCreditCardNo ?
    
       <View style={{width:windowWidth,alignItems:"center",top: 150,position : "absolute",display : "flex"}}>
        <TextInput onChangeText={value=>{
            if(value.length !== 0 && value.length < 17){
              const ascii =  value[value.length-1].charCodeAt()
              if(ascii >= 48 && ascii <= 57){
                this.setState({creditCardNo : value})
              }
            }
          }} 
        placeholder="xxxx-xxxx-xxxx-xxxx"
        style={styles.creditCard} 
        value={this.state.creditCardNo}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if(this.state.creditCardNo.length == 16){
                updateAmount(this.state.amount)
                Alert.alert("Successfully added your fund.")
                this.history.navigate("Donation")
              }else{
                Alert.alert("kindly check your number")
              }
              // this.setState({showPaymentMethod : !this.state.showPaymentMethod})
            }}
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
      </View> 
    : <View></View>
 

    let showPaymentMethod = this.state.showPaymentMethod &&
    <View style={{
      position : "absolute",
      bottom : 0,
      flex :1,
      width : windowWidth,
      backgroundColor : "#268c77"
    }}>
        <TouchableOpacity onPress={()=>this.setState({showCreditCardNo : !this.state.showCreditCardNo})}>
            <Text style={{textAlign : "center",color:"white",padding : 12,fontSize : 20,borderWidth : 1, borderColor : "white"}}>Paypel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setState({showCreditCardNo : !this.state.showCreditCardNo})}>
            <Text style={{textAlign : "center",color:"white",padding : 12,fontSize : 20,borderWidth : 1, borderColor : "white"}}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setState({showPaymentMethod : false})}>
            <Text style={{textAlign : "center",color:"white",padding : 12,fontSize : 20,borderWidth : 1, borderColor : "white"}}>Cancle</Text>
        </TouchableOpacity>
    </View>
  
    return (
      <>

          <Header
            style={styles.Header}
            leftComponent={()=>LeftIcon()}
            centerComponent={{ text: "ADD FUNDS", style: { color: "#fff" } }}
            rightComponent={{ icon: "user", type: "entypo", color: "#fff" }}
            containerStyle={{
              backgroundColor: "#268c77",
            }}
          />

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
        
          </View>

        <View style={[styles.input,{display : this.state.showCreditCardNo ? "none" : "flex"}]}>
            <Text style={styles.Text1}>Enter Amount</Text>
            <Text style={styles.Fontsize}>
              $
            </Text>
            <TextInput onChangeText={value=>{
                    if(value.length !== 0){
                      const ascii =  value[value.length-1].charCodeAt()
                      if(ascii >= 48 && ascii <= 57){
                        this.setState({amount : value})
                      }
                    }
                  }}
                  value={this.state.amount}
                  style={styles.inputbox} 

                      // placeholder="xxxx-xxxx-xxxx-xxxx"
                      placeholderTextColor="black"
            />
        </View>
        <View style={[styles.touchbutton,{display : this.state.showCreditCardNo ? "none" : "flex"}]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("AddFunds");
                this.setState({showPaymentMethod : !this.state.showPaymentMethod})
              }}
            >
              <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
        </View>
        {showCreditCardNo}
        {showPaymentMethod}
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
    textAlign: "center",
    margin: 10,
    backgroundColor: "white",
    fontSize: 26,
    borderRadius: 5,
    paddingVertical: 10,
    width : 200
  },
  creditCard : {
    borderColor: "black",
    borderWidth: 1,
    padding: 16,
    textAlign: "center",
    margin: 10,
    backgroundColor: "white",
    fontSize: 20,
    borderRadius: 5,
    paddingVertical: 5,
    width : 280
  }
});

export default AddFunds;
