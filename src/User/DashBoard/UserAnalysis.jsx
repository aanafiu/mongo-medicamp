import { UserContext } from "@/User/Provider/AuthProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const UserAnalysis = () => {
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

    // Prepare data for chart
    const chartData = camps.map(camp => ({
        name: camp.registrationCampName,
        fees: camp.registrationFees
    }));

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-center mb-6">Registration Fees Analysis</h2>

            {camps.length === 0 ? (
                <p className="text-center">No data available for analysis.</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fill: "white" }} />
                        <YAxis tick={{ fill: "white" }} />
                        <Tooltip />
                        <Bar dataKey="fees" fill="#4CAF50" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default UserAnalysis;
