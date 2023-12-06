import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBa7d4lLtuXcNNn1NMuKvfam7jYazLTrzQ",
  authDomain: "uploadfile-597eb.firebaseapp.com",
  projectId: "uploadfile-597eb",
  storageBucket: "uploadfile-597eb.appspot.com",
  messagingSenderId: 316653077468,
  appId: "1:316653077468:web:67cc1318bc1bb7090fc519"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
