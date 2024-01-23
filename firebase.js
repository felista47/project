import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDMB2Eeexu0UOKZJfzYe80_sdWv0I-bmqU",
  authDomain: "finalproject-a2bc0.firebaseapp.com",
  projectId: "finalproject-a2bc0",
  storageBucket: "finalproject-a2bc0.appspot.com",
  messagingSenderId: "571950753389",
  appId: "1:571950753389:web:9323147afee9dc9981c164"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };