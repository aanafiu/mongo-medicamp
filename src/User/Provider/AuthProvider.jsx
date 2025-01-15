
import app from "@/User/Provider/firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,

  } from "firebase/auth";
import { createContext, useState } from "react";

export const UserContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [userParticipant, setUserParticipant] = useState(null);


    // PhonePass Register
    const registerNewAccount = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    // Pass Information
    const userInfo = {
        userParticipant
    }
    return (
        <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
    );
};

export default AuthProvider;