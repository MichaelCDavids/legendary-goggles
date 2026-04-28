
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDi-udeLvnLa19ROUTOA-QNI1wP2VxszXs",
  authDomain: "legendary-goggles-297529-77b0d.firebaseapp.com",
  projectId: "legendary-goggles-297529-77b0d",
  storageBucket: "legendary-goggles-297529-77b0d.appspot.com",
  messagingSenderId: "559424686391",
  appId: "1:559424686391:web:6148de8e0347b65286f2b2"
}; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
