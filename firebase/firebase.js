import firebase from "firebase/app";
import "firebase/analytics";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "[API_KEY]",
    authDomain: "[AUTH_DOMAIN]",
    projectId: "[PROJECT_ID]",
    storageBucket: "[BUCKET]",
    messagingSenderId: "[SENDER_ID]",
    appId: "[APP_ID]",
    measurementId: "[MEASUREMENT_ID]"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);

    try {
        firebase.analytics();
    } catch (Exception) {}
}

export default firebase