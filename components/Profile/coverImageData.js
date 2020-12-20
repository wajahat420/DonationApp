import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { updateCoverImg } from "../../utils/Auth/Auth.service"
import Firebase from "../../config/Firebase"

export default function imageData(props) {
      const [image,setImage] = useState("")

      if(props.cover_picture !== "" && image === ""){
            setImage(props.cover_picture)
      }
            
      const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [4, 3],
                  base64 : true,
                  quality: 1,
            });
      
            if (!result.cancelled) {
                  const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1);
                  console.log("filename",result)
                  const response = await fetch(result.uri)
                  const blob = await response.blob()
                  setImage(result.uri);

                  Firebase.storage().ref("cover_pictures/"+filename).put(blob)
                  .then(snapshot => snapshot.ref.getDownloadURL())
                  .then(url => { 
                        // setImage(result.uri);
                  })
                  updateCoverImg(props.userID,filename)

            }
      };
    
      return (
            <View style={styles.addImg}>
                  <Image 
                        resizeMode={'contain'}
                        source={{uri:image}}  
                        style={{width:"100%",top:0,height:200,resizeMode: 'stretch',position:"absolute"}} 
                  />                  
                   <TouchableOpacity onPress={pickImage}>
                      <Text style={styles.addImgTxt}>Add Image</Text>
                  </TouchableOpacity>
            </View>
      )
}
const styles = StyleSheet.create({
      addImg:{
            height:200
          
      },
      addImgTxt:{
            backgroundColor:"red",
            color:"white",
            padding:10,
            marginRight:10,
            marginLeft:"auto",
            backgroundColor:"#268c77",
            marginTop:20,
            zIndex :10000
          },
        
})