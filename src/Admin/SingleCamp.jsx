import { Button } from "@/components/ui/button";
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
    axios.get(`http://localhost:5000/allposts/${params.id}`)
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

          const response = await axios.delete(`http://localhost:5000/delete-camp/${campId}`);
          
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
    <div className="w-full h-fit mx-auto p-6 rounded-lg glass">
      <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-5">~{camp.campName}~</h2>
      <img src={camp.image} alt={camp.campName} className="w-full h-[400px] object-fill rounded-md mb-4" />
      
      <p className="dark:text-accent text-muted"><strong>Date & Time:</strong> {camp.dateTime}</p>
      <p className="dark:text-accent text-muted"><strong>Location:</strong> {camp.location}</p>
      <p className="dark:text-accent text-muted"><strong>Healthcare Professional:</strong> {camp.healthcareName}</p>
      <p className="dark:text-accent text-muted"><strong>Participant Count:</strong> {camp.participantCount}</p>
      <p className="dark:text-accent text-muted"><strong>Fees:</strong> ${camp.fees}</p>
      <p className="dark:text-accent text-muted"><strong>Description:</strong> {camp.description}</p>
      
      <div className="flex justify-between mt-4">
        <Link to={`/admin/allposts/update-camp/${camp._id}`} className="bg-muted text-white font-semibold px-4 py-2 rounded-md hover:bg-primary">Update</Link>
        <Button onClick={()=>handleDelete(camp._id)} className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600">Delete</Button>
      </div>
    </div>
  );
};

export default SingleCamp;
