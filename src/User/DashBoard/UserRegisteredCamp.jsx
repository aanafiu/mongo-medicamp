import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/User/Provider/AuthProvider";
import { TiDelete } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { notifySuccess } from "@/User/Common/Notification";
import { IoMdDoneAll } from "react-icons/io";

const UserRegisteredCamps = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  const { userParticipant } = useContext(UserContext);

  // Fetch participant's registered camps
  const fetchRegisteredCamps = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/register-camp-by-user?email=${userParticipant?.email}`)
      .then((res) => {
        setCamps(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching camps:", error);
        setLoading(false);
      });
  };
  
  // Fetch participant's registered camps on component mount
  useEffect(() => {
    fetchRegisteredCamps();
  }, [userParticipant]);

  //   console.log(camps)

  // Filter camps based on search term
  const filteredCamps = camps.filter((camp) =>
    camp?.campName
      ?.toLowerCase()
      .includes(searchTerm?.trim().toLowerCase() || "")
  );

  //   Handle Cancel
  const handleCancelRegisterParticipant = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `http://localhost:5000/cancel-registration/${id}`
          );

          if (response.data.success) {
            Swal.fire(
              "Cancelled!",
              "Your camp registration has been cancelled.",
              "success"
            );
          } else {
            Swal.fire("Error", response.data.message, "error");
          }
          fetchRegisteredCamps();
        } catch (error) {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  //   HandleFeedback
  const handleFeedback = async (id) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Words Limit Below 60",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (text) {
    
      const feedback = text;
      console.log(text);
      axios
        .put(`http://localhost:5000/update-feedback/${id}`, { feedback })
        .then((response) => {
            setLoading(true)
          if (response.data.success) {
            notifySuccess(
              "Updated!",
              "Your feedback has been submitted.",
              "success"
            )
            .then((res)=>{
                if(res.isConfirmed)
                {
                    fetchRegisteredCamps();
                }
            })
          } else {
            Swal.fire("Error", response.data.message, "error");
          }
        });
    }
  };

//   if(loading)
//   {
//     return <Loader></Loader>
//   }

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

      <table className="min-w-full bg-gray-900 border border-collapse text-center border-gray-300">
        <thead>
          <tr className="bg-gray-800 ">
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
          {filteredCamps.map((camp,index) => (
            <tr key={camp.cancelByParticipant ? index : camp.campId} className="border">
              <td className="py-2 px-4">{camp.campName}</td>
              <td className="py-2 px-4">${camp.fees}</td>
              <td className="py-2 px-4">{camp.participantName}</td>
              <td className="py-2 px-4">
                {camp.paymentStatusParticipant === "paid" ? (
                  <span className="text-green-600 font-semibold">Paid</span>
                ) : (
                  <Link to={`/user/dashboard/payment/${camp._id}`}
                    // onClick={() => handlePayment(camp.campId, camp.fees)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Pay
                  </Link>
                )}
              </td>
              <td className="py-2 px-4">
                {camp.confrimationStatusByOrganizer === "confirmed" ? (
                  <span className="text-green-600 font-semibold">
                    Confirmed
                  </span>
                ) : (
                  <span className="text-yellow-500 font-semibold">Pending</span>
                )}
              </td>
              <td className="py-2 px-4">
                {camp.feedback ? (
                  camp.feedback
                ) : (
                  <Button
                    onClick={() => handleFeedback(camp._id)}
                    className="text-3xl"
                  >
                    +
                  </Button>
                )}
              </td>
              <td
                className={`py-2 px-4 ${
                  camp.cancelByParticipant
                    ? "text-red-500"
                    : "text-green-500 text-3xl"
                }`}
              >
                {camp.cancelByParticipant ? (
                  <button
                    disabled={camp.cancelByParticipant }
                    onClick={() => handleCancelRegisterParticipant(camp._id)}
                  >
                    Cancelled
                  </button>
                ) : (
                  <button
                    disabled={ camp.confrimationStatusByOrganizer === "confirmed" ? true : false }
                    onClick={() => handleCancelRegisterParticipant(camp._id)}
                  >
                    {
                        camp.confrimationStatusByOrganizer === "confirmed" ? <IoMdDoneAll /> : <TiDelete />
                    }
                    
                  </button>
                )}
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
