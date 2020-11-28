import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
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
            // display:"flex",
            // flexDirection:"row-reverse",
      },
      addImgTxt:{
            backgroundColor:"red",
            color:"#268c77",
            padding:10,
            marginRight:10,
            marginLeft:"auto",
            backgroundColor:"white",
            marginTop:20,
            zIndex :10000
          },
        
})