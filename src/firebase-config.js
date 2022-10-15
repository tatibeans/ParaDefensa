// Import the functions you need from the SDKs you need
import {initializeApp, getAnalytics, getDatabase} from 'firebase';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwPmcS5_O-HKGhRgMscvPYZ3CpfyKtOu8",
  authDomain: "hilosdeplata-calisto.firebaseapp.com",
  projectId: "hilosdeplata-calisto",
  storageBucket: "hilosdeplata-calisto.appspot.com",
  messagingSenderId: "1069694289947",
  appId: "1:1069694289947:web:4f84a03391215617d450be",
  measurementId: "G-9Z306K8LEY",
  databaseURL: "https://hilosdeplata-calisto-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
