import AllCamps from "@/Hooks/AllCamps";
import Loader from "@/User/Common/Loader";
import { notifyDelete, notifySuccess } from "@/User/Common/Notification";
import axios from "axios";
import { useState, useEffect } from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ManageCamp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { camps, loading, setLoading } = AllCamps();
  const [campList, setCampList] = useState([]); // Local state for real-time update

  // Set campList whenever camps change
  useEffect(() => {
    setCampList(camps);
    setLoading(false)
  }, [camps]);

  const handleDelete = async (campId) => {
    console.log(campId);

    notifyDelete("Do You Want To Delete").then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:5000/delete-camp/${campId}`);
          
          if (response.status === 200) {
            notifySuccess("Successfully Removed");
            
            setLoading(true);
            // Remove the deleted camp from the list
            setCampList(campList.filter(camp => camp._id !== campId));
            
            // Optionally trigger a re-fetch
            setLoading(false);
          }
        } catch (error) {
          console.error("Error deleting camp:", error);
        }
      } else {
        navigate(location.pathname);
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto py-5">
      <h2 className="text-2xl font-bold mb-5 text-center">Camp List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border bg-gray-600 border-violet-400">
          <thead>
            <tr className="bg-gray-900">
              <th className="border p-2">Camp Name</th>
              <th className="border p-2">Date & Time</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Healthcare Professional</th>
              <th className="border p-2">Participants</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campList.map((camp) => (
              <tr key={camp._id} className="border hover:bg-gray-700">
                <td>
                  <Link
                    to={`/admin/allposts/${camp._id}`}
                    className="flex justify-start items-center gap-2"
                  >
                    <HiViewfinderCircle className="text-2xl" />
                    {camp.campName}
                  </Link>
                </td>
                <td className="border p-2">{camp.dateTime}</td>
                <td className="border p-2">{camp.location}</td>
                <td className="border p-2">{camp.healthcareName}</td>
                <td className="border p-2 text-center">{camp.participantCount}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/admin/allposts/update-camp/${camp._id}`)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCamp;
