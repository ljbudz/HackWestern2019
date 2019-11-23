import Firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyCbt9r7pVu9e3J4S3TfWN171m9cX0A5dsM",
  authDomain: "recipe-app-259321.firebaseapp.com",
  databaseURL: "https://recipe-app-259321.firebaseio.com",
  projectId: "recipe-app-259321",
  storageBucket: "recipe-app-259321.appspot.com",
  messagingSenderId: "598930290897",
  appId: "1:598930290897:web:1ffc5a429060ed3ccbedf0",
  measurementId: "G-0BY16H0QLW"
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
