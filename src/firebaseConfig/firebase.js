import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyD04_qN4xhgwjhblHOhB06migeDUbp1YvY",
  authDomain: "old-gold-punjabi-songs.firebaseapp.com",
  databaseURL: "https://old-gold-punjabi-songs.firebaseio.com",
  projectId: "old-gold-punjabi-songs",
  storageBucket: "old-gold-punjabi-songs.appspot.com",
  messagingSenderId: "1082400342303",
  appId: "1:1082400342303:web:afaa096b536380c362302a",
  measurementId: "G-PZ18KE3DZQ",
};
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const myStorage = firebase.storage();
export const singerNameRef = databaseRef.child("Singers");
export const firebasAuth = firebase.auth();
export const realTimeDB = firebase.database();
