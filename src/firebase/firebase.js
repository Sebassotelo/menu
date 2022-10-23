import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_APIKEY_AUTHDOMAIN,
  projectId: process.env.REACT_APP_APIKEY_PROJECTID,
  storageBucket: process.env.REACT_APP_APIKEY_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_APIKEY_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APIKEY_APPID,
  measurementId: process.env.REACT_APP_APIKEY_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
