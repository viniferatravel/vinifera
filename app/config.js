import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZKB2NU_o1AAswaHDMVEu7gO8nTFBY8gw",
  authDomain: "pdfstorage-aa3f7.firebaseapp.com",
  projectId: "pdfstorage-aa3f7",
  storageBucket: "pdfstorage-aa3f7.appspot.com",
  messagingSenderId: "791018763059",
  appId: "1:791018763059:web:eefc586044715e1ab5c446",
  measurementId: "G-43VYBTMC1Q"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);