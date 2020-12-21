import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity ,Alert} from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import * as ImagePicker from 'expo-image-picker';
import { updateProfileImg } from "../../utils/Auth/Auth.service"
import Firebase from '../../config/Firebase';
// import img from "../../assets/cover.png"

export default function imageData(props) {
      const [image,setImage] = useState("")
    
      if(props.profile_picture !== "" && image === ""){
            setImage(props.profile_picture)
      }

      const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
            });
         
            if (!result.cancelled) {
                  
                  const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1);
                  console.log("filename",result)
                  const response = await fetch(result.uri)
                  const blob = await response.blob()

                  Firebase.storage().ref("profile_pictures/"+filename).put(blob)
                  .then(snapshot => snapshot.ref.getDownloadURL())
                  .then(url => { 
                        setImage(result.uri);

                  })
                  updateProfileImg(props.userID,filename)
            }
      };
      console.log("image",image)
      return (
                  <View style={styles.profileImg}>
                        <Image  
                              source={{uri:image}}  
                              style={{width: 120, height: 120, borderRadius: 200/ 2, borderWidth:1 , borderColor:"gray"}} 
                        />
      
                        <View style={{marginLeft:90,position:"relative",display:"flex",alignItems:"center",top:-40}}>
                              <TouchableOpacity  onPress={pickImage}>
                                    <Feather style={{padding:6,backgroundColor:"gray",borderRadius:20,marginRight:0,color:"white"}} name="camera" size={15} />
                              </TouchableOpacity>
                        </View>
                        <View style = {{marginLeft:0,position:"relative",top:-20}}> 
                              <Text style ={{color: 'gray',textAlign:"center"}}>{props.username}</Text>
                              {/* <Text style = {{fontSize:11 , marginLeft : 5,color:'gray'}}>@aunjafri</Text> */}
                        </View>
                  </View>
      )
}
const styles = StyleSheet.create({
      profileImg:{
            position:"absolute",
            top: 120
          },
})