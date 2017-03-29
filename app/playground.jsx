import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCJEOHeTU2mwdyupqAfWCxvk9purP1owYA",
  authDomain: "todo-app-cf884.firebaseapp.com",
  databaseURL: "https://todo-app-cf884.firebaseio.com",
  storageBucket: "todo-app-cf884.appspot.com",
  messagingSenderId: "1036215252250"
};

firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

// Set whipes the existing data and replaces it with the data passed and
// returns a promise.
firebaseRef.set({
  app: {
    name: 'Todo app',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Agustin Castro',
    age: 25
  }
}).then( ()=>{
  console.log('Set worked');
}, () => {
  console.log('Set failed');
} );


// Update modifies a reference but keeps everything else and also returns a promise. it updates only the
// first level of properties, to update an object like app without loosing
// properties we need to use multi path updates,
firebaseRef.update({
  isRunning: false,
  'app/name': 'Todo Application'
});

//What is the same:
firebaseRef.child('app').update({
  name: 'Todo Application'
});

// To remove data from the database we use remove or set the value to null.
firebaseRef.child('app/name').remove();

firebaseRef.child('app').update({
  version: '2.0',
  name: null
});

// Fetch data from firebaseRef
firebaseRef.child('app').once('value').then((snapshot)=>{
  console.log('Got entire database', snapshot.key ,snapshot.val());
}, (e)=>{
  console.log('Unable to fetch value', e);
});

// To listen for changes in the database we use on, everytime some value
//changes we can handle a callback
var callback = (snapshot) => {
  console.log('Got value', snapshot.val());
});
firebaseRef.on('value', callback);

// We turn off the event listener with off passing the callback funciton to off
firebaseRef.off(callback);



var notesRef = firebaseRef.child('notes');
//EVENTS

notesRef.on('child_added', (snapshot) => {
  console.log('child_added', snapshot.key, snapshot.val());
});

notesRef.on('child_changed', (snapshot) => {
  console.log('child_changed', snapshot.key, snapshot.val());
});

notesRef.on('child_removed', (snapshot) => {
  console.log('child_removed', snapshot.key, snapshot.val());
});
