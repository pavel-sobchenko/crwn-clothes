// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgWIBNZfshZFiuUSNdHpjDWA1C4chNsK8",
  authDomain: "crwn-clothing-db-94d81.firebaseapp.com",
  projectId: "crwn-clothing-db-94d81",
  storageBucket: "crwn-clothing-db-94d81.appspot.com",
  messagingSenderId: "262369860458",
  appId: "1:262369860458:web:0a22d128f8e8fb5bd92313"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'user', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createAt});
        } catch(error) {
            console.log('error creating user', error.message);
        }   
    }
    return userDocRef;
}