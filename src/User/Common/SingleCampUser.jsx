import CampById from "@/Hooks/CampById";
import Loader from "@/User/Common/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/User/Provider/AuthProvider";
import { notifySuccess } from "@/User/Common/Notification";
import CurrentUserData from "@/Hooks/CurrentUserData";
import { Button } from "@/components/ui/button";

const SingleCampUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, loading } = CampById(id);

  const { userParticipant } = useContext(UserContext);
  const { userData } = CurrentUserData(userParticipant?.email);

  if (loading) {
    return <Loader />;
  }

  // Function to Open SweetAlert Modal for Registration
  const handleJoinCamp = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Join Camp",
      html: `
            <div class="text-blue-400">
            
                <p><strong>Camp Name:</strong> ${post?.campName}</p>
                <p><strong>Fees:</strong> $${post?.fees}</p>
                <p><strong>Location:</strong> ${post?.location}</p>
                <p><strong>Healthcare Professional:</strong> ${post?.healthcareName}</p>
                <select required id="gender" class="swal2-input">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input required id="age" class="swal2-input" type="number" placeholder="Enter Your Age">
                <input required id="phone" class="swal2-input" type="text" placeholder="Phone Number">
                <input required id="emergencyContact" class="swal2-input" type="text" placeholder="Emergency Contact">
            </div>
                
            `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Register",
      preConfirm: () => {
        const age = document.getElementById("age").value;
        const phone = document.getElementById("phone").value;
        const gender = document.getElementById("gender").value;
        const emergencyContact =
          document.getElementById("emergencyContact").value;

        // Validate that all fields are filled
        if (!age || !phone || !gender || !emergencyContact) {
          Swal.showValidationMessage(
            "All fields are required! Please fill in all details."
          );
          return false;
        }
        return {
          campId: id,
          campName: post?.campName,
          fees: post?.fees,
          location: post?.location,
          healthcareName: post?.healthcareName,
          participantName: userParticipant.displayName,
          participantEmail: userParticipant.email,
          age,
          phone,
          gender,
          emergencyContact,
          paymentStatusParticipant: "unpaid",
          confrimationStatusByOrganizer: "pending",
          cancelByParticipant: false,
          feedback: "",
        };
      },
    });

    if (formValues) {
      // Send data to database

      axios
        .post(
          "http://localhost:5000/register-camp-by-user",
          formValues
        )
        .then((res) => {
          if (res.status === 201) {
            notifySuccess("Registation Complete").then((res) => {
              if (res.isConfirmed) {
                axios
                  .put(
                    `http://localhost:5000/participantCount/${id}`
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      navigate("/user/dashboard/manage-camps");
                    }
                  });
              }
            });
          }
        });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className=" shadow-lg rounded-lg p-6 container h-fit space-y-7 mx-auto">
        {/* Camp Image */}
        <img
          src={post?.image}
          alt={post?.campName}
          className="w-full h-[500px] object-fill rounded-md"
        />

        {/* Camp Details */}
        <h1 className="text-3xl font-bold mt-4">{post?.campName}</h1>
        <p className="text-gray-600 mt-2">{post?.description}</p>

        <div className="mt-4">
          <p>
            <strong>📅 Date & Time:</strong> {post?.dateTime}
          </p>
          <p>
            <strong>📍 Location:</strong> {post?.location}
          </p>
          <p>
            <strong>💰 Fees:</strong> ${post?.fees}
          </p>
          <p>
            <strong>👨‍⚕️ Healthcare Professional:</strong> {post?.healthcareName}
          </p>
          <p>
            <strong>👥 Participants:</strong> {post?.participantCount}
          </p>
        </div>

        {/* Join Camp Button */}
        {userData?.role === "Organizer" ? (
          <div>
              <Link to={`/admin/allposts/${id}`} className=" bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">Manage Camp</Link>
          </div>
        ) : (
          <button
            onClick={handleJoinCamp}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Join Camp
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleCampUser;
