import CurrentUserData from "@/Hooks/CurrentUserData";
import { UserContext } from "@/User/Provider/AuthProvider";
import { useContext } from "react";

const AdminProfile = () => {
    const {userParticipant} = useContext(UserContext);
    const email = userParticipant?.email;
    const {userData, loading} = CurrentUserData(email);
    console.log("ssss",userData, email)
    return (
        <div className="text-white">
            <div>
                <img src={userData.photoURL} className="w-[20%] h-[200px]" alt="" srcset="" />
            </div>
            <h1 className="text-2xl font-extrabold">Role: {userData.role}</h1>     
        </div>
    );
};

export default AdminProfile;