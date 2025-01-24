import { UserContext } from "@/User/Provider/AuthProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const ManageMyRegistrations = () => {
    const { userParticipant } = useContext(UserContext);
    const [camps, setCamps] = useState([]);

    useEffect(() => {
        if (userParticipant?.email) {
            axios.get(`http://localhost:5000/sucessfully-payment?email=${userParticipant.email}`)
                .then(res => {
                    setCamps(res.data.data);
                })
                .catch(error => console.error("Error fetching registrations:", error));
        }
    }, [userParticipant]);

    console.log(camps);

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-center mb-6">My Registered Camps</h2>

            {camps.length === 0 ? (
                <p className="text-center">No registrations found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border text-white bg-gray-950 border-gray-300">
                        <thead>
                            <tr className="uppercase text-sm">
                                <th className="border p-3">Camp Name</th>
                                <th className="border p-3">Fees</th>
                                <th className="border p-3">Location</th>
                                <th className="border p-3">Transaction ID</th> {/* Added Column */}
                                <th className="border p-3">Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {camps.map((camp, index) => (
                                <tr key={index} className="text-center bg-gray-700">
                                    <td className="border p-3">{camp.registrationCampName}</td>
                                    <td className="border p-3">${camp.registrationFees}</td>
                                    <td className="border p-3">{camp.campData?.location || "N/A"}</td>
                                    <td className="border p-3">{camp.transactionId || "N/A"}</td> {/* Transaction ID */}
                                    <td
                                        className={`border p-3 font-semibold ${
                                            camp.paymentStatus === "unpaid"
                                                ? "text-red-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {camp.paymentStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageMyRegistrations;
