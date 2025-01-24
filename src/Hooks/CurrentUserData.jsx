import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const CurrentUserData = (email) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState(0); // State to trigger refetch

  const fetchUserData = useCallback(async () => {
    if (!email) return;

    setLoading(true);
    const res = await axios.get(`http://localhost:5000/user-role?email=${email}`);
    setUserData(res.data);
    setLoading(false);
  }, [email]);

  // Fetch user data on mount & when refetchFlag changes
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, refetchFlag]);

  // Function to trigger refetch
  const refetch = () => {
    setRefetchFlag((prev) => prev + 1);
  };

  return { userData, loading, refetch };
};

export default CurrentUserData;
