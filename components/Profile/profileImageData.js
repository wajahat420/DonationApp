import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import * as ImagePicker from 'expo-image-picker';
import { updateProfileImg } from "../../utils/Auth/Auth.service"


export default function imageData(props) {
      const [image,setImage] = useState("")
    
      if(props.profile_picture !== "" && image === ""){
            setImage(props.profile_picture)
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
                  updateProfileImg(props.userID,result.base64)
            }
      };
      return (
                  <View style={styles.profileImg}>
                        <Image 
                              source={{uri:`data:image/png;base64,${image}`}}  
                              style={{width: 120, height: 120, borderRadius: 200/ 2, borderWidth:1 , borderColor:"gray"}} 
                        />
      
                        <View style={{marginLeft:90,position:"relative",display:"flex",alignItems:"center",top:-40}}>
                              <TouchableOpacity  onPress={pickImage}>
                                    <Feather style={{padding:6,backgroundColor:"gray",borderRadius:20,marginRight:0,color:"white"}} name="camera" size={15} />
                              </TouchableOpacity>
                        </View>
                        <View style = {{marginLeft:38,position:"relative",top:-20}}> 
                              <Text style ={{color: 'gray'}}>Aun Jafri</Text>
                              <Text style = {{fontSize:11 , marginLeft : 5,color:'gray'}}>@aunjafri</Text>
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