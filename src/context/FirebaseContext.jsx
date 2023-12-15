import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const FirebaseContext = createContext(null);
const firebaseAuth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore();
const storage = getStorage();

export const FirebaseProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            console.log(user);
            setUser(user);
        })

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    },[])

    const logIn = (email, password) => {
      return signInWithEmailAndPassword(firebaseAuth, email, password);
    };
    const signUp = (email, password) => {
      return createUserWithEmailAndPassword(firebaseAuth, email, password);
    };
    const logInWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

    const isLoggedIn = user ? true : false;

    const createListing = async (name, isbnNumber, price, cover) => {
        try {
            const imgRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`)
            const uploadResult = await uploadBytes(imgRef, cover)
            return await addDoc(collection(firestore, 'books'), {
                name,
                isbnNumber,
                price,
                imageURL: uploadResult.ref.fullPath,
                userID: user.uid,
                userEmail: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            });
        } catch (error) {
            console.error('Error creating listing:', error);
            throw error;
        }
    };

    const fetchBookslist = () => {
        return getDocs(collection(firestore, "books"))
    };
    const getImageUrl = (path) => {
        const imageRef = ref(storage, path)
        return getDownloadURL(imageRef);
    }

    return (
      <FirebaseContext.Provider value={{ logIn, signUp, logInWithGoogle, isLoggedIn, createListing, fetchBookslist, getImageUrl }}>
        {children}
      </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    return useContext(FirebaseContext);
};
