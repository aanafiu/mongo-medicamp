import CurrentUserData from "@/Hooks/CurrentUserData";
import Loader from "@/User/Common/Loader";
import { UserContext } from "@/User/Provider/AuthProvider";
import { useContext } from "react";

const UserProfile = () => {
    const {userParticipant} = useContext(UserContext);
    const email = userParticipant?.email;
    const {userData, loading} = CurrentUserData(email);
    // const {name, photoURL, role} = userData;
    console.log("ssss",userData, email)
    if(loading)
    {
        return <Loader></Loader>
    }
    return (
        <div className="text-white space-y-1">
            <div>
                <img src={userData?.photoURL} className="w-[20%] h-[30%] border rounded-sm shadow-md shadow-black mb-5" alt="" srcset=""  />
            </div>
            <h1 className="text-2xl font-extrabold">Role: {userData?.role}</h1>    
            <h1 className="text-lg font-semibold">Name: {userData?.name}</h1> 
            <h1 className="text-lg font-semibold">Email: {userData?.email}</h1> 
        </div>
    );
};

export default UserProfile;