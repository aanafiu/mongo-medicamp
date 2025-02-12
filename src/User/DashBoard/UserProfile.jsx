import { useContext, useState } from "react";
import CurrentUserData from "@/Hooks/CurrentUserData";
import Loader from "@/User/Common/Loader";
import { UserContext } from "@/User/Provider/AuthProvider";
import axios from "axios";
import { notifySuccess, notifyError } from "@/User/Common/Notification";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
    const { userParticipant } = useContext(UserContext);
    const email = userParticipant?.email;
    const { userData, loading, refetch } = CurrentUserData(email);

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState(null);

    if (loading) {
        return <Loader />;
    }

    // Image Upload Handler
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const apiKey = "9a6f84f430229a50a927e5775a8d1091"; 
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?key=${apiKey}`,
            formData
        );

        if (response.data.success) {
            setImage(response.data.data.url);
        } else {
            notifyError("Image upload failed.");
        }
    };

    // Handle profile update
    const handleUpdate = async () => {
        const updatedData = {
            name: name || userData?.name,
            role: role || userData?.role,
            photoURL: image || userData?.photoURL
        };

        await axios.put(`https://backend-medicamp-a12.vercel.app/update-user-role?email=${email}`, updatedData)
            .then(res => {
                if (res.status === 200) {
                    notifySuccess("Profile Updated Successfully");
                    refetch();
                } else {
                    notifyError("Failed to update profile");
                }
            });
    };

    return (
        <div className="text-primary space-y-4 p-6">
            <div className="flex flex-col items-center">
                <img src={userData?.photoURL} className="w-44 h-44 border rounded-full shadow-lg mb-3" alt="User" />
                <h1 className="text-2xl font-bold">Role: {userData?.role}</h1>    
                <h1 className="text-lg font-semibold">Name: {userData?.name}</h1> 
                <h1 className="text-lg font-semibold">Email: {userData?.email}</h1> 
            </div>
            
            <div className="border-t border-muted w-full pt-4 mx-auto">
                <h2 className="text-2xl font-bold mb-3">Update Profile</h2>
                
                <div className="space-y-3 space-x-3 h-fit">
                    <input type="text" placeholder="Update Name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Update Role" className="input-field" value={role} onChange={(e) => setRole(e.target.value)} />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="input-field" />
                    {image && <img src={image} alt="New Upload" className="w-24 h-24 mt-2 rounded-full" />}
                </div>
                
                <Button 
                    onClick={handleUpdate} 
                    className="mt-4  text-white px-4 py-2 rounded"
                >
                    Update
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;
