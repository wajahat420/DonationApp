import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAZ91Wqgqas4bZEXu094-MC0w-oHhqbh9I",
  authDomain: "charityapp-6993e.firebaseapp.com",
  databaseURL: "https://charityapp-6993e.firebaseio.com",
  projectId: "charityapp-6993e",
  storageBucket: "",
  messagingSenderId: "839685726332",
  appId: "1:839685726332:web:df15c3acfc6cea0fb769f9",
};
// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
