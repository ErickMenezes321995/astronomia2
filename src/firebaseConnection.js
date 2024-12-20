import { initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyD3zFL8F82MT1UC7qNBNftIAs9gLf_NP-Q",
    authDomain: "galaxy-aad5f.firebaseapp.com",
    projectId: "galaxy-aad5f",
    storageBucket: "galaxy-aad5f.firebasestorage.app",
    messagingSenderId: "952366364165",
    appId: "1:952366364165:web:f17f227c6e732a64d00e6c",
    measurementId: "G-H29N0S8K8H"
  };


  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  export { db, auth };