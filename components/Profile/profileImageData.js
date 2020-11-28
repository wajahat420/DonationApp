import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import * as ImagePicker from 'expo-image-picker';

export default function imageData() {
      const [image,setImage] = useState(null)
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
                  quality: 1,
            });
      
            console.log("result==> ",result);
      
            if (!result.cancelled) {
                  setImage(result.uri);
            }
      };

      return (
            <View>
                  <View style={styles.profileImg}>
                        <Image 
                        source={{uri:image}}  
                        style={{width: 120, height: 120, borderRadius: 200/ 2, borderWidth:2 , borderColor:"blue"}} 
                        />
                        <View style={{marginLeft:100,marginBottom:50,zIndex:10000,position:"relative"}}>
                              <TouchableOpacity  onPress={pickImage}>
                                    <Feather style={{marginBottom:10,padding:10,backgroundColor:"gray",borderRadius:20,marginTop:"auto",marginRight:0}} name="camera" size={20} />
                              </TouchableOpacity>
                        </View>
                  </View>
                  <View style = {{marginLeft:38}}> 
                        <Text style ={{color: 'gray'}}>Aun Jafri</Text>
                        <Text style = {{fontSize:11 , marginLeft : 5,color:'gray'}}>@aunjafri</Text>
                  </View>

          </View>
      )
}
const styles = StyleSheet.create({
      profileImg:{
            // display:"flex",
            // flexDirection:"row",
            // width:"100%",
            position:"absolute",
            marginTop : 50
          },
})