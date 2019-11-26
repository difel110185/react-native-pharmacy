import Firebase from "firebase";
import {FIREBASE_APIKEY, AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from 'react-native-dotenv';

let config = {
    apiKey: FIREBASE_APIKEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};

export const db = Firebase.initializeApp(config).database();
