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
        photoURL: "https://i.postimg.cc/zf4W6thw/default-avatar.jpg",
      });
      await userCredentials.user.reload();
      history.navigate("PostFeed");
      console.log("register" ,Firebase.auth().currentUser.displayName);
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
    .catch((error) => console.log("error",error));
};

export const createPost = (loggedUserName, value, imgURL,category) => {
  var id = Math.floor(Math.random() * 100) + 1;
  let userID = id.toString();
  const profilePicture = null;
  console.log(loggedUserName,value,imgURL) 
  Firebase.database()
    .ref("posts/" + userID)
    .set({
      username: loggedUserName,
      textMsg: value,
      profile_picture: profilePicture,
      imageUrl: imgURL,
      category
    });
};
// export const getCurrentUserData = () => {
//   Firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       return {
//         displayName: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//         userId: user.uid,
//       };
//     } else {
//       // User is signed out.
//       // ...
//     }
//   });
// };



