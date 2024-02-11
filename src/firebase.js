// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = initializeApp({
  apiKey: "AIzaSyALvIKLnRwJV4M0tjy2TPczqhIDW6OAt8w",
  authDomain: "go-travel-855cd.firebaseapp.com",
  projectId: "go-travel-855cd",
  storageBucket: "go-travel-855cd.appspot.com",
  messagingSenderId: "614960931634",
  appId: "1:614960931634:web:485ba588a8c3e61851ad2b",
});

export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
