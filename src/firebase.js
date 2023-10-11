// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLZJRS3l6OcS-EQJLHzYgcBYNiuAJLan4",
  authDomain: "pnhs-online-voting.firebaseapp.com",
  databaseURL: "https://pnhs-online-voting-default-rtdb.firebaseio.com",
  projectId: "pnhs-online-voting",
  storageBucket: "pnhs-online-voting.appspot.com",
  messagingSenderId: "632079493009",
  appId: "1:632079493009:web:0af187a44ad4c4bc259c30",
  measurementId: "G-565M261NPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage, analytics};