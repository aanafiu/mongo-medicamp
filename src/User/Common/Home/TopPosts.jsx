import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import toppost from "../../../assets/top-post.json";
import Lottie from "lottie-react";

const TopPosts = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://backend-medicamp-a12.vercel.app/top-posts")
      .then((res) => {
        setTopPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className=" flex justify-between items-center">
      <div className="h-24 w-24">
          <Lottie animationData={toppost}></Lottie>
        </div>
        <h2 className="text-3xl underline font-bold text-center text-primary mb-8">
          Top Popular Posts
        </h2>
        <div className="h-24 w-24">
          <Lottie animationData={toppost}></Lottie>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-300 h-48 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPosts.map((post, index) => (
            <div
              key={post._id}
              className="relative flex flex-col justify-between bg-muted dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
            >
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {index + 1}. {post.campName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {post.description?.slice(0, 100)}...
                </p>
              </div>

              <div className="absolute bottom-2 left-3 bg-primary text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-semibold">
                <FaUsers /> {post.participantCount}
              </div>

              <div className="p-4 bg-gray-100 dark:bg-gray-800 text-right">
                <Link
                  to={`user/allcamps/${post._id}`}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-80"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopPosts;
