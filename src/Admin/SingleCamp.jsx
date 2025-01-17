import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleCamp = () => {
  const [camp, setCamp] = useState([]);
  const params = useParams();
  console.log(params.id)
  useEffect(()=>{
    axios.get(`http://localhost:5000/allposts/${params.id}`)
    .then(res=>{
      console.log(res.data)
      setCamp(res.data)
    })
  },[params])

  

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-5">{camp.campName}</h2>
      <img src={camp.image} alt={camp.campName} className="w-full h-64 object-cover rounded-md mb-4" />
      
      <p><strong>Date & Time:</strong> {camp.dateTime}</p>
      <p><strong>Location:</strong> {camp.location}</p>
      <p><strong>Healthcare Professional:</strong> {camp.healthcareName}</p>
      <p><strong>Participant Count:</strong> {camp.participantCount}</p>
      <p><strong>Fees:</strong> ${camp.fees}</p>
      <p><strong>Description:</strong> {camp.description}</p>
      
      <div className="flex justify-between mt-4">
        <Link to={`/admin/allposts/update-camp/${camp._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</Link>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default SingleCamp;
