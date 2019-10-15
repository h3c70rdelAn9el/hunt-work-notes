import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import firebaseConfig from './config/firebase_key';

// require('dotenv').config()

const settings = {timestampsInSnapshots: true};

// const config = {
//   apiKey: "AIzaSyAlJ5C4ZDYtd5VpNJmaRBHah1kjb39cvTs",
//   authDomain: "fire-two-deux.firebaseapp.com",
//   databaseURL: "https://fire-two-deux.firebaseio.com",
//   projectId: "fire-two-deux",
//   storageBucket: "fire-two-deux.appspot.com",
//   messagingSenderId: "536394168526",
//   appId: "1:536394168526:web:fd99cfd919a011f9bd789f",
//   measurementId: "G-9Q21VR8PC5"
// };

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;
