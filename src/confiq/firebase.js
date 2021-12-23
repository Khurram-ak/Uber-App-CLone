import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";
import { Alert } from 'react-native';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjQbrFLvY8nhKw5QJRptCRXgI1UE6kdaQ",
    authDomain: "kaar-app.firebaseapp.com",
    projectId: "kaar-app",
    storageBucket: "kaar-app.appspot.com",
    messagingSenderId: "999634754837",
    appId: "1:999634754837:web:db87b3886afd4244845d1c"
};

firebase.initializeApp(firebaseConfig);
 

