import Loader from "@/User/Common/Loader";
import app from "@/User/Provider/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  // Loader
  const [loading, setLoading] = useState(true);

  const [userParticipant, setUserParticipant] = useState(null);
  // User Loader All Time
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserParticipant(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // PhonePass Register
  const registerNewAccount = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

//   Google Login or Signup User
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    // console.log("i am here");
    
    return signInWithPopup(auth, provider);
  };

//   Login With email and password
  // Login
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  };

  //   Update Information
  const updateDetails = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    })
  };

//  logOut
  // Sign Out
  const logOutUser = () => {

    return signOut(auth);
  };


  // Pass Information
  const userInfo = {
    userParticipant,
    updateDetails,
    registerNewAccount,
    loginWithGoogle,
    loginUser,
    logOutUser
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
