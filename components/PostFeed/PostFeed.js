import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import NavHeader from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  Header,
  Icon,
  Input,
  Avatar,
  Image
} from "react-native-elements";
import MainCarousel from "../Carousel/Carousel";
import Firebase from "../../config/Firebase";
import { uploadComment } from "../../utils/Auth/Auth.service";

const PostFeed = (props) => {
  let iterate = true
  
  const [profilePicture,setProfilePicture] = useState([]) 
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("")
  const [userID, setUserID] = useState("")
  const [loggedUserName,setLoggedUserName] = useState("")

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
    selectedIndex == 1 ? props.navigation.navigate("FollowingTwo") : null;
    selectedIndex == 2 ? props.navigation.navigate("Profile") : null;
  };

  useEffect(() => {
    var postFeeds = Firebase.database().ref("/posts");
    postFeeds.once("value").then((snapshot) => {
      const data = snapshot.val();
      var myData = []
      if(data != null){
        myData = Object.keys(data).map((key) => {
          let obj = data[key]
          obj["postID"] = key
          return obj;
        });
      }
      setPosts(myData);
    });

    Firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserID(user.uid);
        setLoggedUserName(user.displayName);
      } 
    });
  }, []);
  const getProfile = async(arr)=>{
      let temp = []
        for(let i=0;i<arr.length;i++){
          let profilePicture = arr[i]
          if(profilePicture !== ""){
            await Firebase.storage().ref().child('profile_pictures/'+profilePicture).getDownloadURL().then(function(url) {
              temp.push(url)
            })
          }else{
            temp.push("")
          }
        }
        console.log("chck",temp)
      setProfilePicture(temp)
      
    }
  const additional_info = async(idArr)=>{
    iterate  = false
    await Firebase.database().ref("/additional_info").once("value").then((snapshot) => {
      const data = snapshot.val();  
      let temp = []

      idArr.forEach(id => {
        let found  =false
        Object.keys(data).forEach(elem=>{

          if(data[elem].userID == id && data[elem].profile_picture !== ""){
            found = true
            temp.push(data[elem].profile_picture)
            
          }
        })
        if(!found){
          temp.push("")
        }
      })
      getProfile(temp)
  
    });
  }
  console.log("temp",profilePicture)

    const allUserID = []
    const getAllPosts =  posts.map( (data,key) => {
      const comments = data.comments === undefined ? {} : data.comments 
      allUserID.push(data.userID)
      if(posts.length-1 == key && iterate){
        additional_info(allUserID)
      }

       return (      
            <>
         
              <View
                key = {key}
                style={{
                  borderColor: "#e6e6e6",
                  paddingLeft: 20,
                  marginTop: 10,
                }}
              >
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Avatar
                      rounded
                      size={25}
                      source={{
                        uri: profilePicture[key],
                      }}
                    />
                    <Text
                      style={{
                        color: "#268c77",
                        fontSize: 15,
                        fontWeight: "bold",
                        marginLeft: 5,
                        paddingBottom: 5,
                      }}
                    >
                      {data.username}
                    </Text>
                  </View>
                </View>
    
                <Text style={{ color: "#787878" }}>{data.textMsg}</Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      // props.navigation.navigate("");
                    }}
                    style={{ marginLeft: 1, paddingBottom: 5 }}
                  >
                    <Image
                      style={{ width: 15, height: 15, marginRight: 10 }}
                      source={{
                        uri:
                          "https://i.postimg.cc/kXGpQtm3/206-2066210-thumb-up-icon-color-thumbs-up-like-icon-png.jpg",
                      }}
                    />
                  </TouchableOpacity>
    
                  <TouchableOpacity
                    onPress={() => {
                      // props.navigation.navigate("");
                    }}
                    style={{ marginLeft: 1 }}
                  >
                    <Image
                      style={{ width: 15, height: 15, marginRight: 10 }}
                      source={{
                        uri: "https://i.postimg.cc/BQtqwgFm/supporticon.jpg",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // props.navigation.navigate("");
                    }}
                    style={{ marginLeft: 1 }}
                  >
                    <Image
                      style={{ width: 15, height: 15, marginRight: 10 }}
                      source={{
                        uri: "https://i.postimg.cc/63Qq0NfQ/242127.png",
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {Object.keys(comments).map((key,index)=>{
                const commentObj = comments[key] 
                  
                  return(
                    <View style={{
               
                    }}>
                      <View style={{ flexDirection: "row" }}>
                        <Avatar
                          rounded
                          size={25}
                          source={{uri:`data:image/png;base64,${profilePicture}`}}  
                        /> 
                        <Text
                          style={{
                            color: "#268c77",
                            fontSize: 15,
                            fontWeight: "bold",
                            marginLeft: 5,
                            paddingBottom: 5,
                          }}
                        >
                          {commentObj.username}
                        </Text>
                      </View>
                      <Text style={{ color: "#787878" }}>{commentObj.comment}</Text>
                    </View>
                  )
                })}
                <View style={{ width: 330, position: "relative", right: 10 }}>
                  <Input
                    placeholder="Comment"
                    leftIcon={
                      <Icon
                        name="comment"
                        type="evilicon"
                        color="#737373"
                        size={25}
                        onPress ={()=>{
                          uploadComment(userID,data.postID,comment,loggedUserName)
                          // window.location.reload(false)
                          
                        }}
                      />
                    }
                    style={{ fontSize: 13 }}
    
                    onChangeText={(value) => setComment(value)}
                  />
                </View>
              </View>
            </>
       )
    })

            
  const LeftIcon = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("CreatePost");
          }}
          style={{ marginLeft: 25, paddingBottom: 5 }}
        >
          <Image
            style={{ width: 22, height: 22 }}
            source={{
              uri: "https://i.postimg.cc/vm28BnyH/simple-60-512.png",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const CenterIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("CreatePost");
        }}
        style={{ marginLeft: 0 }}
      >       
        <Text style={{ color: "#737373", fontSize: 16 }}>
          Share your thoughts or photos
        </Text>
      </TouchableOpacity>
    );
  };
  const history = props.navigation;

  return (
    <>
      <View style={styles.container2}>
        <NavHeader
          history={history}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          updateIndex={updateIndex}
        />
        <Header
          placement="left"
          leftComponent={() => LeftIcon()}
          centerComponent={() => CenterIcon()}
          containerStyle={{
            backgroundColor: "#fff",
            justifyContent: "space-around",
            paddingBottom: 15,
            height: 55,
            elevation: 5,
          }}
        />

        <ScrollView>
          <MainCarousel />  
          <View>{getAllPosts}</View>
        </ScrollView>
        <Footer history={history} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PostFeed;
