// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionInfo = {}) => {
    const userDocRef = doc(db, 'user', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, 
                {
                    displayName, 
                    email, 
                    createAt, 
                    ...additionInfo
                });
        } catch(error) {
            console.log('error creating user', error.message);
        }   
    }
    return userDocRef;
}

export const createSignInWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await createSignInWithEmailAndPassword(auth, email, password);
};