import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserRegisteredCamps = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch participant's registered camps
  useEffect(() => {
    axios.get("http://localhost:5000/registered-camps")
      .then((res) => setCamps(res.data))
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

 

  // Filter camps based on search term
  const filteredCamps = camps.filter(camp =>
    camp.campName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Registered Camps</h2>
        <input
          type="text"
          placeholder="Search by Camp Name"
          className="border px-3 py-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Camp Name</th>
            <th className="py-2 px-4 border">Fees</th>
            <th className="py-2 px-4 border">Participant Name</th>
            <th className="py-2 px-4 border">Payment Status</th>
            <th className="py-2 px-4 border">Confirmation Status</th>
            <th className="py-2 px-4 border">Feedback</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCamps.map((camp) => (
            <tr key={camp.campId} className="border">
              <td className="py-2 px-4">{camp.campName}</td>
              <td className="py-2 px-4">${camp.fees}</td>
              <td className="py-2 px-4">{camp.participantName}</td>
              <td className="py-2 px-4">
                {camp.paymentStatusParticipant === "paid" ? (
                  <span className="text-green-600 font-semibold">Paid</span>
                ) : (
                  <button
                    onClick={() => handlePayment(camp.campId, camp.fees)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Pay
                  </button>
                )}
              </td>
              <td className="py-2 px-4">
                {camp.confrimationStatusByOrganizer === "confirmed" ? (
                  <span className="text-green-600 font-semibold">Confirmed</span>
                ) : (
                  <span className="text-yellow-500 font-semibold">Pending</span>
                )}
              </td>
              <td className="py-2 px-4">
                {camp.feedback ? (
                  <span className="text-gray-700">{camp.feedback}</span>
                ) : camp.paymentStatusParticipant === "paid" &&
                  camp.confrimationStatusByOrganizer === "confirmed" ? (
                  <button
                    onClick={() => handleFeedback(camp.campId)}
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                  >
                    Give Feedback
                  </button>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="py-2 px-4">
                <button>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
          {filteredCamps.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No camps found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserRegisteredCamps;
