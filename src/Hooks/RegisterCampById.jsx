import { useEffect, useState } from "react";

const RegisterCampById = (campId) => {
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!campId) return;

    const fetchCamp = async () => {
      try {
        const response = await fetch(`http://localhost:5000/register-camp-by-user/${campId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch camp");
        }

        const data = await response.json();
        setCamp(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCamp();
  }, [campId]);

  return { camp, loading, error };
};

export default RegisterCampById;
