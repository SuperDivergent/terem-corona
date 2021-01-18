import firebase from "firebase/app";
import "firebase/firestore";

const dbConfig = {
  apiKey: "AIzaSyDg2VElOCtU56veQlOP1JzWipirTC57aIs",
  authDomain: "terem-coronatime.firebaseapp.com",
  projectId: "terem-coronatime",
  storageBucket: "terem-coronatime.appspot.com",
  messagingSenderId: "971108403452",
  appId: "1:971108403452:web:fb67ee996827d02cbd6f79",
  measurementId: "G-8G9L59Q22W",
};

firebase.initializeApp(dbConfig);
export const db = firebase.firestore();

export default firebase;
