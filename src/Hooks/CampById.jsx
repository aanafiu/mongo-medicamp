import { useEffect, useState } from "react";
import axios from "axios";

const CampById = (id) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // Prevent API call if ID is missing

        const fetchPost = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:5000/allposts/${id}`);
                setPost(data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch post data");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    return { post, loading, error };
};

export default CampById;
