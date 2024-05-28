import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBoMnpy1Bf2AaWdW60yotxg3Y6jD_fiqak",
    authDomain: "netflix-clone-92666.firebaseapp.com",
    projectId: "netflix-clone-92666",
    storageBucket: "netflix-clone-92666.appspot.com",
    messagingSenderId: "943955066007",
    appId: "1:943955066007:web:016ca068e5f5ce904d3dd2",
    measurementId: "G-DF43M55ECN"
  };;


firebase.initializeApp(firebaseConfig);

export default firebase;