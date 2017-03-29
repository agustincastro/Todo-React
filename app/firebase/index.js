import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyCJEOHeTU2mwdyupqAfWCxvk9purP1owYA",
    authDomain: "todo-app-cf884.firebaseapp.com",
    databaseURL: "https://todo-app-cf884.firebaseio.com",
    storageBucket: "todo-app-cf884.appspot.com",
    messagingSenderId: "1036215252250"
  };

  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
