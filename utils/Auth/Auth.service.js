import Firebase from "../../config/Firebase";


export const RegisterUser = async (name, email, password, history) => {
  try {
    const userCredentials = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );
    
    if (userCredentials.user) {
      console.log("entry")
      await userCredentials.user.updateProfile({
        displayName: name,
        photoURL: "https://i.postimg.cc/zf4W6thw/default-avatar.jpg"
      });
      await userCredentials.user.reload();
      history.navigate("PostFeed");
      console.log("register" ,Firebase.auth().currentUser);
    }else{
      console.log("else",userCredentials)
    }
  } catch (error) {
    console.log(`error:, ${error}`);
    
  }
};

export const UserLogin = (email, password, history) => {
  Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log("res",res)
      history.navigate("PostFeed")
    }) 
    .catch((error) => (alert("Invalid")));
   

};

export const createPost = (loggedUserName,userID, value, imgURL,category) => {
  var id = Math.floor(Math.random() * 100) + 1;
  id = id.toString();
  // const profilePicture = null;
  console.log(loggedUserName,value,imgURL) 
  Firebase.database()
    .ref("posts/" + id)
    .set({
      username: loggedUserName,
      userID,
      textMsg: value,
      // profile_picture: profilePicture,
      imageUrl: imgURL,
      category,
      comments : []
    });
};
export const uploadComment = (userID,postID, comment,username) => {
  console.log(userID, postID, comment)
  Firebase.database()
    .ref("posts/")
    .child(postID+"/comments")
    .push({
      userID,
      comment,
      username
    });
};

export const updateProfileImg = (userID,fileName) => {
  var id = Math.floor(Math.random() * 100) + 1;
  id = id.toString();
  console.log("updateProfileImg",userID,fileName)
  var additional_info = Firebase.database().ref("/additional_info");
  additional_info.once("value").then((snapshot) => {
    const data = snapshot.val();
    
    var id_additional_info = null
    if(data != null){
      Object.keys(data).forEach(elem=>{
        let obj = data[elem]
        if(obj.userID == userID){
          id_additional_info = elem
        }
      })
      if(id_additional_info == null){
        console.log("if")
        Firebase.database()
        .ref("additional_info/" + id)
        .set({
          userID,
          profile_picture: fileName,
          cover_picture : "",
          following : 0,
          followers : 0
        });
      }else{
        console.log("else")
        Firebase.database()
        .ref("additional_info")
        .child(id_additional_info)
        .update({ 
          profile_picture: fileName,
        });
      }
   
    }
    
  });
};

export const updateCoverImg = (userID,fileName) => {
  var id = Math.floor(Math.random() * 100) + 1;
  id = id.toString();
  
  var additional_info = Firebase.database().ref("/additional_info");
  additional_info.once("value").then((snapshot) => {
    const data = snapshot.val();
    
    var id_additional_info = null
    if(data != null){
      Object.keys(data).forEach(elem=>{
        let obj = data[elem]
        if(obj.userID == userID){
          id_additional_info = elem
        }
      })
      if(id_additional_info == null){
        Firebase.database()
        .ref("additional_info/" + id)
        .set({
          userID,
          profile_picture: "",
          cover_picture : fileName,
          following : 0,
          followers : 0
        });
      }else{
        Firebase.database()
        .ref("additional_info")
        .child(id_additional_info)
        .update({
          cover_picture: fileName ,
        });
      }
   
    }
    
  });
};

// export const signOutUser = async () => {
//   try {
//       await firebase.auth().signOut();
//       history.navigate('Login');
//   } catch (e) {
//       console.log(e);
//   }
// }


