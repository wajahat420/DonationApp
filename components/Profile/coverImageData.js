import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { updateCoverImg } from "../../utils/Auth/Auth.service"


export default function imageData(props) {
      const [image,setImage] = useState("")

      if(props.cover_picture !== "" && image === ""){
            setImage(props.cover_picture)
      }
      useEffect(() => {
            (async () => {
                  if (Platform.OS !== 'web') {
                  const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                  if (status !== 'granted') {
                  alert('Sorry, we need camera roll permissions to make this work!');
                  }
                  }
            })();
      }, []);
            
      const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  base64 : true,
                  quality: 1,
            });
      
            if (!result.cancelled) {
                  setImage(result.base64);
                  updateCoverImg(props.userID,result.base64)

            }
      };
    
      return (
            <View style={styles.addImg}>
                  <Image 
                        resizeMode={'contain'}
                        source={{uri:`data:image/png;base64,${image}`}}  
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