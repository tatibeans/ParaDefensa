// Import the functions you need from the SDKs you need
import { initializeApp, getAnalytics, getDatabase } from 'firebase';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCm69phuGXfMDWqey5CqzFrb4oxsAvTcak",
  authDomain: "hilos-de-plata-calisto.firebaseapp.com",
  projectId: "hilos-de-plata-calisto",
  storageBucket: "hilos-de-plata-calisto.appspot.com",
  messagingSenderId: "539217773186",
  appId: "1:539217773186:web:9341654b61d5d8701b2a9b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
