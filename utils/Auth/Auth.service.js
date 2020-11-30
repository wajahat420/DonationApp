import Firebase from "../../config/Firebase";

export const RegisterUser = async (name, email, password, history) => {
  try {
    const userCredentials = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );
    if (userCredentials.user) {
      await userCredentials.user.updateProfile({
        displayName: name,
        photoURL: "https://i.postimg.cc/zf4W6thw/default-avatar.jpg",
      });
      await userCredentials.user.reload();
      history.navigate("PostFeed");
      console.log(Firebase.auth().currentUser.displayName);
    }
  } catch (error) {
    console.log(`error:, ${error}`);
  }
};

export const UserLogin = (email, password, history) => {
  Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => history.navigate("PostFeed")) 
    .catch((error) => console.log(error));
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

export const createPost = (loggedUserName, value, imgURL) => {
  var id = Math.floor(Math.random() * 100) + 1;
  let userID = id.toString();
  const profilePicture = null;
  Firebase.database()
    .ref("posts/" + userID)
    .set({
      username: loggedUserName,
      textMsg: value,
      profile_picture: profilePicture,
      imageUrl: imgURL,
    });
};
