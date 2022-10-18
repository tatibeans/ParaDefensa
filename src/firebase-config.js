// Import the functions you need from the SDKs you need
import { initializeApp, getAnalytics, getDatabase } from 'firebase';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBLDSfGqF3oymJhJ-C_YefAsW0ShjHNRlQ",
  authDomain: "hilos-de-plata-f3c15.firebaseapp.com",
  projectId: "hilos-de-plata-f3c15",
  storageBucket: "hilos-de-plata-f3c15.appspot.com",
  messagingSenderId: "121265900713",
  appId: "1:121265900713:web:1ad3031fb360d9342d2db8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
