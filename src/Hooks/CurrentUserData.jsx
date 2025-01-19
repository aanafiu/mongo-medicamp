import { useEffect, useState } from "react";
import axios from "axios";

const CurrentUserData = (email) => {
    console.log(email)
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!email) return;

    const fetchUserData = async () => {
      setLoading(true);
      const res = await axios.get(`https://backend-medicamp-a12.vercel.app/user-role?email=${email}`);
    //   console.log(res.data)
      setUserData(res.data)
      setLoading(false)
    };

    fetchUserData();
  }, [email]);
//   console.log("sss" , userData)
  return { userData, loading };
};

export default CurrentUserData;
