"use strict";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
/**
 * Web app's Firebase configuration
 */
const firebaseConfig = {
  apiKey: "AIzaSyBuGe1bTio4gEDhiEyh0As_Uj7OgihXFCk",
  authDomain: "proyecto-integrador-80a90.firebaseapp.com",
  projectId: "proyecto-integrador-80a90",
  storageBucket: "proyecto-integrador-80a90.appspot.com",
  messagingSenderId: "78283338849",
  appId: "1:78283338849:web:f47a83973bc04270486620",
  measurementId: "G-G9EEDNZB8W"
};
/**
 * Initialize Firebase
 */
const app = initializeApp(firebaseConfig);
/**
 * return auth and db
 */
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };