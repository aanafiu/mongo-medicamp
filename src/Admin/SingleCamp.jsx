import AllCamps from "@/Hooks/AllCamps";
import Loader from "@/User/Common/Loader";
import { notifyDelete, notifySuccess } from "@/User/Common/Notification";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const SingleCamp = () => {
  const [camp, setCamp] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(params.id)
  useEffect(()=>{
    axios.get(`https://backend-medicamp-a12.vercel.app/allposts/${params.id}`)
    .then(res=>{
      console.log(res.data)
      setCamp(res.data)
    })
  },[params])

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

          const response = await axios.delete(`https://backend-medicamp-a12.vercel.app/delete-camp/${campId}`);
          
          if (response.status === 200) {
            notifySuccess("Successfully Removed");
            
            setLoading(true);
            // Remove the deleted camp from the list
            setCampList(campList.filter(camp => camp._id !== campId));
            
            // Optionally trigger a re-fetch
            setLoading(false);
            navigate("/admin/manageallcamps");
          }

      } else {
        navigate(location.pathname);
      }
    });
  };

  if(loading)
  {
    return <Loader></Loader>
  }

  

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-5">{camp.campName}</h2>
      <img src={camp.image} alt={camp.campName} className="w-full h-64 object-fill rounded-md mb-4" />
      
      <p><strong>Date & Time:</strong> {camp.dateTime}</p>
      <p><strong>Location:</strong> {camp.location}</p>
      <p><strong>Healthcare Professional:</strong> {camp.healthcareName}</p>
      <p><strong>Participant Count:</strong> {camp.participantCount}</p>
      <p><strong>Fees:</strong> ${camp.fees}</p>
      <p><strong>Description:</strong> {camp.description}</p>
      
      <div className="flex justify-between mt-4">
        <Link to={`/admin/allposts/update-camp/${camp._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</Link>
        <button onClick={()=>handleDelete(camp._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
};

export default SingleCamp;
