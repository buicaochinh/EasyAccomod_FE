import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnVKAMeweBD7XaoDDUi4eKOP2rVbKXDO8",
  authDomain: "chat-app-715b1.firebaseapp.com",
  projectId: "chat-app-715b1",
  databaseUrl: "https://chat-app-715b1-default-rtdb.firebaseio.com/",
  storageBucket: "chat-app-715b1.appspot.com",
  messagingSenderId: "739281632266",
  appId: "1:739281632266:web:18f200ac9a609e2e5cf3f3",
  measurementId: "G-4F4X2DMSPB"
};

let fire = firebase.initializeApp(firebaseConfig);

export default fire;
