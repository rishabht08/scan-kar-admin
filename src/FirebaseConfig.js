import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

var myApp = app.initializeApp({
  apiKey: 'AIzaSyAqVacJ3RYmVPS3efu4OC3EPRv8JE31ibg',
  authDomain: 'tally-8e171.firebaseapp.com',
  databaseURL: 'https://tally-8e171.firebaseio.com',
  projectId: 'tally-8e171',
  storageBucket: 'tally-8e171.appspot.com',
  messagingSenderId: '582506896895',
  appId: '1:582506896895:web:4558751a068445453f1bca',
  measurementId: 'G-7LRWDXPKRM',
});

export default myApp
//&& this.auth.currentUser.displayName
