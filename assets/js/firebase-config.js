// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBZSP7CF1qWOUtI7710O6eT_SJPzm2ow1k",
    authDomain: "blog-test-cf27d.firebaseapp.com",
    databaseURL: "https://blog-test-cf27d.firebaseio.com",
    projectId: "blog-test-cf27d",
    storageBucket: "blog-test-cf27d.appspot.com",
    messagingSenderId: "712716765117",
    appId: "1:712716765117:web:757aed783e2814d70eb4d4",
    measurementId: "G-3E2DRSVVNM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();