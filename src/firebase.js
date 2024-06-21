import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getToken } from "firebase/messaging";
import { getMessaging } from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: "AIzaSyDjMVp5h99h6jvllaihWN1kou6u4-8zE5g",
  authDomain: "credito-cobranza-d198b.firebaseapp.com",
  projectId: "credito-cobranza-d198b",
  storageBucket: "credito-cobranza-d198b.appspot.com",
  messagingSenderId: "405109869739",
  appId: "1:405109869739:web:05b20e5b1f8f907df63bee",
  measurementId: "G-CCJ2FKN42R"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging(app);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  })
}

// getToken(messaging).then((currentToken) => {
//   console.log("CurrentToken:", currentToken);
//   if (currentToken) {
//     console.log(currentToken);
//   } else {
//     console.log('No registration token available. Request permission to generate one.');
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token.', err);
// });