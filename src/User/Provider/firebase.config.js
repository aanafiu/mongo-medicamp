// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChiZ6iEXdLJ65uVo76ZGzhMLi-1girTQM",
  authDomain: "mongo-medicamp.firebaseapp.com",
  projectId: "mongo-medicamp",
  storageBucket: "mongo-medicamp.firebasestorage.app",
  messagingSenderId: "828281259951",
  appId: "1:828281259951:web:f4273253fe1831329e515a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;