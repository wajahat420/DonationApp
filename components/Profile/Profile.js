
import React, { useState,useEffect,Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity,TextInput,ScrollView,Share , Button} from "react-native";
import NavHeader from "../Header/Header";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileImageData from "./profileImageData"
import CoverImageData from "./coverImageData"
import AddBio from "./addBio";
import Firebase from "../../config/Firebase";
import { Dimensions } from 'react-native';
import {MyContext} from "../../context/context"


export default class Profile extends Component {
  static contextType = MyContext

  constructor({navigation}){
    super()
    this.windowWidth = Dimensions.get('window').width;

    this.history = navigation
    this.shareOptions =  {
      title: 'App link',
      message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
      url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
    };
    this.userID
  }
  state = {
    selectedIndex : 2,
    userID : "",
    username : "",
    showLogout : false,
    profile_picture : "",
    cover_picture : "",
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
    selectedIndex == 1 ? this.history.navigate("FollowingGroup") : null;
    selectedIndex == 0 ? this.history.navigate("PostFeed") : null;
  };
  async getProfileAndCoverURL(obj){
    let profile_picture = ""
    let cover_picture = ""
    var storageRef = Firebase.storage().ref();

    if (obj.profile_picture !== ""){
      await storageRef.child('profile_pictures/'+obj.profile_picture).getDownloadURL().then(function(url) {
            profile_picture = url
            console.log("url",profile_picture)
      })
    }
    if(obj.cover_picture !== ""){
      await storageRef.child('cover_pictures/'+obj.cover_picture).getDownloadURL().then(function(url) {
        cover_picture = url
      })
    }
    this.setState({ 
      profile_picture,
      cover_picture
    })
  }
    username = async() =>{
      let userID = ""
      let username = ""
      await Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          userID = user.uid
          username = user.displayName
        } 
      });   
      this.setState({userID, username})
    }
    componentDidMount(){
      this.username()
 
      var additional_info = Firebase.database().ref("/additional_info");
      additional_info.once("value").then((snapshot) => {
        const data = snapshot.val();  

        Object.keys(data).forEach(elem=>{
          if(data[elem].userID == this.state.userID){
            this.getProfileAndCoverURL(data[elem])
          }
        })
      });
  }
  render() {
    let logout = this.state.showLogout  ?

    <View style={{
      position : "absolute",
      bottom : 0,
      flex :1,
      width : this.windowWidth,
      backgroundColor : "#268c77"
    }}>
        <TouchableOpacity onPress={()=>this.history.navigate("Login")}>
            <Text style={{textAlign : "center",color:"white",padding : 12,fontSize : 20,borderWidth : 1, borderColor : "white"}}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setState({showLogout : false})}>
            <Text style={{textAlign : "center",color:"white",padding : 12,fontSize : 20,borderWidth : 1, borderColor : "white"}}>Cancle</Text>
        </TouchableOpacity>
    </View>
    : <View></View>

    return (
      <>
        <View style={styles.container2}>
          <NavHeader
            history={this.history}
            selectedIndex={this.state.selectedIndex}
            setSelectedIndex={this.setSelectedIndex}
            updateIndex={this.updateIndex}
          />
          <ScrollView>
  
                <CoverImageData
                    userID = {this.state.userID}
                    cover_picture = {this.state.cover_picture}
                />
                <ProfileImageData
                  userID = {this.state.userID}
                  username = {this.state.username}
                  profile_picture = {this.state.profile_picture}
                />
                <View style={styles.follow}>
                  <View style={styles.profileDetail}>
                    <TouchableOpacity onPress={()=>this.setState({showLogout : !this.state.showLogout})}>
                        <Entypo  name="dots-three-vertical" size={25} color="#268c77"/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.profileDetail}>
                    <TouchableOpacity onPress={()=>Share.share(this.shareOptions)}>
                      <AntDesign  name="sharealt" size={25} color="#268c77"/>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.profileDetail}>
                    <Text style = {{textAlign:'center', color:'gray'}}>0</Text>
                    <Text style = {{color:'gray'}}>followers</Text>
                  </View>
                  <View style={styles.profileDetail}>
  
                    <Text style = {{textAlign:'center',color:"gray"}}>0</Text>
                    <Text style = {{color:'gray'}}>following</Text>
                  </View>
                
                </View>
                <AddBio/>
                <View style = {styles.EditBio}>
                <TextInput 
                      
                  underlineColorAndroid = "transparent"
                  placeholder = " Type something"
                  placeholderTextColor = "#9a73ef"
                  autoCapitalize = "none"
                      
                />
                </View>
          </ScrollView>

          {logout}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 10,
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },



  profileImgTxt:{
    padding:20,
    borderRadius:50,
    backgroundColor:"#268c77",
    fontSize:35,
    borderWidth:2,
    marginLeft:20,
    borderColor:"white",
    color:"white",
  },
  follow:{
    display:"flex",
    flexDirection:"row-reverse"
  },
  profileDetail:{
    padding:10,
    textAlign:'center',
    color:'gray'
   
  },
  EditBio:{
    borderRadius:8,
    padding:2,
    margin: 15,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    display:'none'
    
  },
  Edit:{
    textAlign:'right',
    
  },
 AddACauze : {
  padding:30,
  borderRadius:2,
  width:140,
  height:85,
  fontSize:35,
  borderWidth:1,
  marginLeft:20,
  borderColor:"grey",
 
 },
 ButtonAddCauze :{
   marginLeft:20,
   
 },
 LocalProfit: {
  padding:30,
  borderRadius:5,
  width:90,
  height:85,
  fontSize:35,
  borderWidth:2,
  marginLeft:20,
  borderColor:"grey",
  marginTop:15,
  borderStyle:"dashed"
 }



});

// export default Profile;