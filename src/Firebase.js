import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import firebaseConfig from './config/firebase_key';
import "firebase/auth";


const settings = {timestampsInSnapshots: true};


firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;
