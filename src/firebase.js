import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4sYI7dnqxoKS4bfnOifklytLOiYFxWj4",
  authDomain: "admin-console-4b197.firebaseapp.com",
  projectId: "admin-console-4b197",
  storageBucket: "admin-console-4b197.appspot.com",
  messagingSenderId: "169192498918",
  appId: "1:169192498918:web:f204a7a98d06941374fd27",
  measurementId: "G-8ZYNB881WC",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
//console.log(auth);
