"use strict";

import {addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import {db} from "../firebase/firebase.config";

/**
 * Collection reference to the 'users' collection in Firestore.
 * @type {CollectionReference<DocumentData>}
 */
const usersRef = collection(db, "users");
/**
 * Creates a new user document in Firestore.
 * @param {Object} userData - The data of the user to be created.
 * @returns {Promise<DocumentReference>} A promise that resolves with the reference to the newly created user document.
 */
const createUser = async (userData) => {
    try {
        const docRef = await addDoc(usersRef, userData);
        console.log("Document written with ID: ", docRef.id);
        return { success: true, docRef: docRef };
    } catch (error) {
        console.error("Error adding document: ", error);
        return { success: false, error: error };
    }
};

/**
 * Reads the data of a user from Firestore based on their email.
 * @param {string} userEmail - The email of the user to be read.
 * @returns {Promise<{ success: boolean, userData?: Object, message?: string }>} A promise that resolves with an object containing the success status, user data if found, and an optional message.
 */
const readUser = async (userEmail) => {
    try {
        const querySnapshot = await getDocs(query(usersRef, where("email", "==", userEmail)));
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return { success: false, message: "No user found" };
        }
        const userData = querySnapshot.docs[0].data();
        console.log("User data retrieved successfully");
        return { success: true, userData: userData };
    } catch (error) {
        console.error("Error retrieving user data: ", error);
        return { success: false, error: error };
    }
};

/**
 * Updates the data of a user in Firestore.
 * @param {string} userEmail - The email of the user to be updated.
 * @param {Object} userData - The updated data of the user.
 * @returns {Promise<{ success: boolean, message?: string }>} A promise that resolves with an object containing the success status and an optional message.
 */
const updateUser = async (userEmail, userData) => {
    try {
        const userQuerySnapshot = await getDocs(query(usersRef, where("email", "==", userEmail)));

        if (userQuerySnapshot.empty) {
            console.log("No user found with that email.");
            return {success: false, message: "No user found with that email"};
        }

        const userDocRef = userQuerySnapshot.docs[0].ref;

        await updateDoc(userDocRef, userData);

        console.log("User updated successfully");
        return {success: true, message: "User updated successfully"};
    } catch (error) {
        console.log("Error updating user: ", error);
        return {success: false, message: "Error updating user: " + error.message};
    }
};

export {createUser, readUser, updateUser};
