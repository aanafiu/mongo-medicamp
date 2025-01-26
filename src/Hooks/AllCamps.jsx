import { useState, useEffect } from "react";
import axios from "axios";

const AllCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get("https://backend-medicamp-a12.vercel.app/allposts"); // Replace with your API URL
        setCamps(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  return { camps, loading, error, setLoading };
};

export default AllCamps;
