import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth"
import {addDoc,collection,getFirestore } from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAD6_qkT36MOWz4V72bNvSSXcWYMSnMwbg",
  authDomain: "netflix-clone-32e6a.firebaseapp.com",
  projectId: "netflix-clone-32e6a",
  storageBucket: "netflix-clone-32e6a.firebasestorage.app",
  messagingSenderId: "169193358338",
  appId: "1:169193358338:web:89d7edb5283ee504e4531b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)

        const user = res.user;

        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:'local',
            email,
        })
        
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
        }
}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth,db,signup,login,logout}