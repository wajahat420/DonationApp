import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyAZ91Wqgqas4bZEXu094-MC0w-oHhqbh9I",
//   authDomain: "charityapp-6993e.firebaseapp.com",
//   databaseURL: "https://charityapp-6993e.firebaseio.com",
//   projectId: "charityapp-6993e",
//   storageBucket: "",
//   messagingSenderId: "839685726332",
//   appId: "1:839685726332:web:df15c3acfc6cea0fb769f9",
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyCK7rHK1mtaigDMpbO1nZgk9ISAmNwZFrE",
//   authDomain: "charityapp-6993e.firebaseapp.com",
//   databaseURL: "https://fir-project-f6b63.firebaseio.com",
//   projectId: "fir-project-f6b63",
//   storageBucket: "",
//   messagingSenderId: "690159639325",
//   appId: "1:690159639325:android:03f56998d7cd143070dff4",
// };
var firebaseConfig = {
  apiKey: "AIzaSyD70oVfB06Hhu5TncvqmneZemGGDgHR5-I",
  authDomain: "college-recruitment-system.firebaseapp.com",
  databaseURL: "https://college-recruitment-system.firebaseio.com",
  projectId: "college-recruitment-system",
  storageBucket: "college-recruitment-system.appspot.com",
  messagingSenderId: "285023715721",
  appId: "1:285023715721:web:63b46241423a0453882158"
};
// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
