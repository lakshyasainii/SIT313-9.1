import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB6yqppO2Zn_sjv1pDRX98-8wArUs88fTg",
    authDomain: "sit-313-task-7-1p.firebaseapp.com",
    databaseURL: "https://sit-313-task-7-1p-default-rtdb.firebaseio.com",
    projectId: "sit-313-task-7-1p",
    storageBucket: "sit-313-task-7-1p.appspot.com",
    messagingSenderId: "449196229331",
    appId: "1:449196229331:web:00bc1e935c42dd80b6ca26",
    measurementId: "G-B2MMMLNF0Z"
  };

const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();
export const createuserdocfromAuth = async (userAuth, additionalInformation = {}) => 

{
  if (!userAuth.email) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef)

  const userSnapShots = await getDoc(userDocRef);
  console.log(userSnapShots)
  console.log(userSnapShots.exists())

  if (!userSnapShots.exists()) 
  {
    const { displayName, email } = userAuth
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch (error) {
      console.log('error in creating', error.message)
    }

  }
  return userDocRef;
}

export async function createAuthUserWithEmailAndPassword(email, password) 
{
  if (!email || !password)
    return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export async function signinAuthUserWithEmailAndPassword(email, password) 
{
  if (!email || !password)
  return
  return await signInWithEmailAndPassword(auth, email, password)
}