import Firebase from "firebase";
import {FIREBASE_APIKEY, authDomain,databaseURL,projectId,
    storageBucket,messagingSenderId,appId,measurementId} from 'react-native-dotenv';
let config = {
    apiKey: FIREBASE_APIKEY,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
};
let app = Firebase.initializeApp(config);
export const db = app.database();
export const db2 = app.database;