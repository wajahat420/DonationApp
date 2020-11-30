import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import * as ImagePicker from 'expo-image-picker';
// import dp from "../../assets/dp.png"
// import dp from "../../assets/dp.png"

export default function imageData() {
      const [image,setImage] = useState("file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdummy-63c5f8f5-111e-4a89-85d5-cc508345c7fd/ImagePicker/eb5ad55e-98af-448a-9106-93a87a0f8994.jpg")
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
            console.log("working")
            let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
            });
      
            console.log("result==> ",result);
      
            if (!result.cancelled) {
                  setImage(result.uri);
                  console.log(result.uri)
            }
      };

      return (
                  <View style={styles.profileImg}>
                        <Image 
                        source={{uri:image}}  
                        style={{width: 120, height: 120, borderRadius: 200/ 2, borderWidth:1 , borderColor:"gray"}} 
                        />
                        {/* <View style={{marginLeft:90,position:"relative",display:"flex",alignItems:"center",top:-40}}>
                              <TouchableOpacity  onPress={pickImage}>
                                    <Feather  style={{padding:10,marginBottom:-20,backgroundColor:" rgb(163, 163, 163)",borderRadius:15,color:" rgb(40, 70, 15)"}} name="camera" size={15} />
                              </TouchableOpacity>
                        </View> */}
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