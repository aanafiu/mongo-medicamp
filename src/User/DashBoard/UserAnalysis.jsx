import { UserContext } from "@/User/Provider/AuthProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const UserAnalysis = () => {
    const { userParticipant } = useContext(UserContext);
    const [camps, setCamps] = useState([]);

    useEffect(() => {
        if (userParticipant?.email) {
            axios.get(`https://backend-medicamp-a12.vercel.app/sucessfully-payment?email=${userParticipant.email}`)
                .then(res => {
                    setCamps(res.data.data);
                })
                .catch(error => console.error("Error fetching registrations:", error));
        }
    }, [userParticipant]);

    // Prepare data for chart
    const chartData = camps.map(camp => ({
        name: camp.registrationCampName,
        fees: camp.registrationFees
    }));

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center underline mb-6">Registration Fees Analysis</h2>

            {camps.length === 0 ? (
                <p className="text-center">No data available for analysis.</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fill: "#E16A54" }} />
                        <YAxis tick={{ fill: "#E16A54" }} />
                        <Tooltip />
                        <Bar dataKey="fees" fill="#E16A54" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default UserAnalysis;
