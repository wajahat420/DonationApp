
import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet,TouchableOpacity,TextInput,ScrollView,Share} from "react-native";
import NavHeader from "../Header/Header";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileImageData from "./profileImageData"
import CoverImageData from "./coverImageData"
import AddBio from "./addBio"
import Firebase from "../../config/Firebase";

const Profile = (props) => {
  const InputVisibilityHidden =  false
  const [selectedIndex, setSelectedIndex] = useState(2);

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    selectedIndex == 1 ? props.navigation.navigate("FollowingGroup") : null;
    selectedIndex == 0 ? props.navigation.navigate("PostFeed") : null;
  };
  const history = props.navigation;
  const shareOptions = {
    title: 'App link',
    message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
    url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
  };
  async function get(){
    console.log("working")
    const user = FirebaseAuth.getInstance().getCurrentUser();
    const userid = user.getUid();
    console.log(Firebase.auth().currentUser);
    console.log(user,userid)  
  }
  get()
  return (
    <>
      <View style={styles.container2}>
        <NavHeader
          history={history}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          updateIndex={updateIndex}
        />
      {/* <Text>Profile Screen</Text> */}
        <ScrollView>

              <CoverImageData/>
              <ProfileImageData/>
              <View style={styles.follow}>
                <View style={styles.profileDetail}>
                  <Entypo  name="dots-three-vertical" size={25} color="#268c77"/>
                </View>
                <View style={styles.profileDetail}>
                  <TouchableOpacity onPress={()=>Share.share(shareOptions)}>
                    <AntDesign  name="sharealt" size={25} color="#268c77"/>
                  </TouchableOpacity>
                  {/* <Share/> */}
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
                      <View>
                          <Text style={{width: 130, textAlign: 'center',letterSpacing:2,color:'gray'}}>YOUR CAUZE</Text>
                    </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
          </View>
                <View style = {styles.Edit}>
                  <TouchableOpacity>
                  
                    <Text style = {{textAlign : "right" , padding : 6, fontSize : 15, color:'gray'}} >edit</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                <View style = {styles.AddACauze}>
                  <Text style = {{textAlign : 'center' , fontSize : 18, color:'gray'}}>+</Text>
                  
                </View>
                </TouchableOpacity>
                <View style = {styles.ButtonAddCauze}>
                  <TouchableOpacity>
                  <Text style = {{fontSize:11 , fontWeight:'bold',color:'gray'}}> + Add a Cauze</Text>
                  </TouchableOpacity>
                  </View>
                 

                  <View style={{flexDirection: 'row', alignItems: 'center' , marginTop:13}}>
                    <View style={{flex: 0.5, height: 1, backgroundColor: 'gray'}} />
                      <View style = {styles.NonProfit}>
                          <Text style={{width: 270, textAlign: 'center', letterSpacing: 2,color:'gray'}}>YOUR FAVOURITE NONPROFITS</Text>
                    </View>
                    <View style={{flex: 0.5, height: 1, backgroundColor: 'gray'}} />
                  </View>
                  <TouchableOpacity>
                  <View style = {styles.LocalProfit}>
                  <Text style = {{textAlign : 'center' , fontSize : 18 ,color:'gray'}}>+</Text>
                  
                </View>
                </TouchableOpacity>
         

                
        </ScrollView>
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

export default Profile;