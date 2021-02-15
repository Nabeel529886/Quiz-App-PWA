importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js")



let firebaseConfig = {
    apiKey: "AIzaSyDVs_iCFHWNnlWKdWeoIDFVQAQ1C0wAtf0",
    authDomain: "quiz-app-pwa-77318.firebaseapp.com",
    projectId: "quiz-app-pwa-77318",
    storageBucket: "quiz-app-pwa-77318.appspot.com",
    messagingSenderId: "358092976766",
    appId: "1:358092976766:web:2ae55906d9c14ef8fbde2f",
    measurementId: "G-3010DQE9J0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging()