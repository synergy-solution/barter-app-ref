import firebase from 'firebase';
// require('firebase/firestore')

//Replace this config with your own config
let firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();