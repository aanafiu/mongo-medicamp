import Loader from "@/User/Common/Loader";
import { notifyError } from "@/User/Common/Notification";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { use } from "react";

const ManageRegistrationCamps = () => {
    const [registrations, setRegistrations] = useState([]);

    // Fetch registration data
 const fetchAllData = ()=>{
 
        axios.get("https://backend-medicamp-a12.vercel.app/sucessfully-payment-admin")
            .then((res) => {
                if (res.data.success) {
                    // Filter only paid registrations
                    const paidRegistrations = res.data.data;
                    setRegistrations(paidRegistrations);
                }
            })
            .catch((error) => console.error("Error fetching registrations:", error));
    
 }

 useEffect(()=>{
    fetchAllData();
 },[])

    // Handle confirmation status change
    const [loading,setLoading] = useState(false)
    const handleStatusChange = (id, newStatus) => {
        
        // console.log(id)
        setLoading(true);
        axios.put(`https://backend-medicamp-a12.vercel.app/update-confirmation/${id}`, {
            confrimationStatusByOrganizer: newStatus
        })
        .then((res) => {

            if (res.status === 200) {
                // Update state to reflect the change
                setRegistrations((prevRegistrations) =>
                    prevRegistrations.map((reg) =>
                        reg._id === id ? { ...reg, campData: { ...reg.campData, confrimationStatusByOrganizer: newStatus } } : reg
                    )
                );
                
                setLoading(false);
                fetchAllData();
            }else{
                notifyError("User Canceled")
            }
        })
        .catch(() => notifyError("User Canceled"));
    };

    if(loading)
    {
        return <Loader></Loader>
    }

    return (
        <div className="container text-primary mx-auto px-4 py-6">
            <h2 className="text-4xl underline font-bold text-center mb-6">Manage Registrations</h2>

            {registrations.length === 0 ? (
                <p className="text-center">No registrations found.</p>
            ) : (
                <div className="overflow-visible glass rounded-none">
                    <table className="w-full border-collapse border-2  text-primary ">
                        <thead>
                            <tr className="uppercase text-sm bg-gray-950">
                                <th className="border p-3">Transaction ID</th>
                                <th className="border p-3">Camp Name</th>
                                <th className="border p-3">Participant</th>
                                <th className="border p-3">Email</th>
                                <th className="border p-3">Fees</th>
                                
                                <th className="border p-3">Status</th>
                                <th className="border p-3">Action</th>
                                <th className="border p-3">FeedBack</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => (
                                <tr key={reg._id} className="text-center glass hover:bg-card">
                                    <td className="border-2 border-primary p-3 text-muted font-bold">{reg.transactionId}</td>
                                    <td className="border-2 border-primary  p-3">{reg.registrationCampName}</td>
                                    <td className="border-2 border-primary  p-3">{reg.participantName}</td>
                                    <td className="border-2 border-primary  p-3">{reg.participantEmail}</td>
                                    <td className="border-2 border-primary  p-3">${reg.registrationFees}</td>
                                    <td className="border-2 border-primary  p-3">
                                        <select
                                            className="p-2 border-2 bg-primary text-white"
                                            value={reg.campData.confrimationStatusByOrganizer}
                                            onChange={(e) => handleStatusChange(reg.registrationIdByParticipant, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                        </select>
                                    </td>
                                    <td className={`border-2 border-primary p-3 font-semibold ${
                                            reg.paymentStatus === "unpaid"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}>
                                        {
                                            reg.paymentStatus
                                        }
                                    </td>
                                   
                                    <td className="border-2 border-primary p-3 text-white">{!reg?.campData?.feedback ? "N/A" : reg.campData.feedback}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageRegistrationCamps;
