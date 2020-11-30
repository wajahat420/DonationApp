import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';


export default function imageData() {
      const [image,setImage] = useState("file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdummy-63c5f8f5-111e-4a89-85d5-cc508345c7fd/ImagePicker/9b15bacd-78f7-418c-a740-cd2252e6e00b.jpg")
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
            // display:"flex",
            // flexDirection:"row-reverse",
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