import React, { useState } from "react";
import { View, Text, StyleSheet ,TouchableOpacity,ScrollView,Switch} from "react-native";
import NavHeader from "../Header/Header";
import Footer from "../Footer/Footer";
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const FollowingTwo = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    selectedIndex == 0 ? props.navigation.navigate("PostFeed") : null;
    selectedIndex == 2 ? props.navigation.navigate("Profile") : null;
  };
  const users = [
    {
       name: 'brynn',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
   
   ]
   
  const history = props.navigation;
  console.log(props.navigation)

  return (
    <>
  
      <View style={styles.container2}>
        <NavHeader
          history={history}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          updateIndex={updateIndex}
        />
        
        
        <View style = {styles.FoodEdu}>  
        
         
          <TouchableOpacity
          onPress = {()=>{
                history.navigate("FollowingGroup")
          }}
          > 
        <Card> 
        <Card.Title>Groceries</Card.Title>
          
        <Card.Divider/>
            <Card.Image source={require('../.././assets/grocery.jpeg')} 
            style = {{width:115,height:100}}
            
            />
          {props.navigation.navigate("Grocery")} 
            
        </Card>
        </TouchableOpacity> 
       
        
        <TouchableOpacity
        onPress = {()=>{
            history.navigate("FollowingGroup")
      }}
        > 
          
        <Card> 
        <Card.Title>Scolarships</Card.Title>
          
        <Card.Divider/>
            <Card.Image source={require('../.././assets/imagesScolar.jpeg')} 
                  style = {{width:115,height:100}}
            />
        </Card>
       </TouchableOpacity> 
       </View>
    <View style = {styles.MediClothes}>  
        < TouchableOpacity
        onPress = {()=>{
            history.navigate("FollowingGroup")
      }}
        > 
        <Card> 
        <Card.Title>Clothes</Card.Title>
          
        <Card.Divider/>
            <Card.Image source={require('../.././assets/clothes.jpeg')} 
            style = {{width:115,height:100}}
            
            />
          
            
        </Card>
      </TouchableOpacity> 
      <TouchableOpacity
      onPress = {()=>{
            history.navigate("FollowingGroup")
      }}
      > 
          
      <Card> 
        <Card.Title>Money</Card.Title>
          
        <Card.Divider/>
            <Card.Image source={require('../.././assets/Donate.jpeg')} 
            style = {{width:115,height:100}}
            
            />
          
            
        </Card>
      </TouchableOpacity> 
      </View>


      
      <Footer history={history} />
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
  
  FoodEdu:{
     height:120,
     flexDirection:'row',
     width:140,
     alignItems:'center',
    justifyContent:'space-between',
    marginTop:30,
    paddingRight:20
    
  },
  
   MediClothes:{
      height:230,
      flexDirection:'row',
      width:170,
      paddingTop:60,
     
      alignItems:'center',
     justifyContent:'space-between'
      
}
});

export default FollowingTwo;