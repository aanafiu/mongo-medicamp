import AllCamps from "@/Hooks/AllCamps";
import { useEffect, useState } from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

const ManageCamp = () => {
  const navigate = useNavigate();
  const { camps, loading, error } = AllCamps();

  const handleDelete = async (campId) => {
    console.log(campId)
    // const confirmDelete = window.confirm("Are you sure you want to delete this camp?");
    // if (!confirmDelete) return;

    // try {
    //   const response = await fetch(`https://yourapi.com/delete-camp/${campId}`, {
    //     method: "DELETE",
    //   });

    //   if (response.ok) {
    //     setCamps(camps.filter((camp) => camp._id !== campId));
    //     alert("Camp deleted successfully");
    //   } else {
    //     alert("Failed to delete camp");
    //   }
    // } catch (error) {
    //   console.error("Error deleting camp:", error);
    // }
  };

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
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr key={camp._id} className="border hover:bg-gray-700">
                <td><Link to={`/admin/allposts/${camp._id}`} className="flex justify-start items-center gap-2"><HiViewfinderCircle className="text-2xl" />{camp.campName}</Link></td>
                <td className="border p-2">{camp.dateTime}</td>
                <td className="border p-2">{camp.location}</td>
                <td className="border p-2">{camp.healthcareName}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/update-camp/${camp._id}`)}
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
