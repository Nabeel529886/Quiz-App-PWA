import firebase from 'firebase/app';
import 'firebase/messaging'

var firebaseConfig = {
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


export const configNotification = () => {
    Notification.requestPermission().then(permission => {
        messaging.getToken().then(currentToken => {
            if (currentToken){}
            else{
                console.log("No Registration Token Available")
            }
        })
    }).catch(err => {
        console.log(err)
    })
}