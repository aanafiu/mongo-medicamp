import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { notifyError, notifySuccess } from "@/User/Common/Notification";

const UpdateCamp = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [camp, setCamp] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch existing camp details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/allposts/${id}`)
      .then((res) => {
        setCamp(res.data);
        setImageUrl(res.data.image); // Set initial image

        Object.keys(res.data).forEach((key) => setValue(key, res.data[key]));
      })
      .catch((error) => notifyError(error));
  }, [id, setValue]);

  // Image Upload Handler
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = "9a6f84f430229a50a927e5775a8d1091"; 
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      if (response.data.success) {
        setImageUrl(response.data.data.url);
      } else {
        notifyError("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = (updatedData) => {
    updatedData.image = imageUrl || camp.image; // Use uploaded or existing image

    axios
      .put(`http://localhost:5000/update-camp/${id}`, updatedData)
      .then((res) => {
        if (res.status === 200) {
          notifySuccess("Post Updated Successfully").then((res) => {
            if (res.isConfirmed) {
              navigate(`/admin/allposts/${id}`);
            }
          });
        }
      })
      .catch(() =>
        notifyError("There Is Nothing To Change").then((res) => {
          if (res.isConfirmed) {
            navigate(location.pathname);
          }
        })
      );
  };

  if (!camp) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-5">Update Camp</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {/* Image Upload */}
        <div className="col-span-2 flex flex-col gap-3 justify-center items-center">
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="w-40 h-40 mt-2 rounded-full shadow-lg" />
          )}
          {loading && <p className="text-blue-500">Uploading...</p>}
          <label className="font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input-field"
          />
        </div>

        {/* Camp Name */}
        <div className="flex flex-col">
          <label className="font-semibold">Camp Name</label>
          <input
            {...register("campName", { required: "Camp Name is required" })}
            type="text"
            className="input-field"
          />
          {errors.campName && <span className="text-red-500">{errors.campName.message}</span>}
        </div>

        {/* Date & Time */}
        <div className="flex flex-col">
          <label className="font-semibold">Date & Time</label>
          <input
            {...register("dateTime", { required: "Date & Time is required" })}
            type="date"
            className="input-field"
          />
          {errors.dateTime && <span className="text-red-500">{errors.dateTime.message}</span>}
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="font-semibold">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            type="text"
            className="input-field"
          />
          {errors.location && <span className="text-red-500">{errors.location.message}</span>}
        </div>

        {/* Healthcare Professional */}
        <div className="flex flex-col">
          <label className="font-semibold">Healthcare Professional</label>
          <input
            {...register("healthcareName", { required: "Name is required" })}
            type="text"
            className="input-field"
          />
          {errors.healthcareName && <span className="text-red-500">{errors.healthcareName.message}</span>}
        </div>

        {/* Participant Count */}
        <div className="flex flex-col">
          <label className="font-semibold">Participant Count</label>
          <input
            {...register("participantCount", { required: true, valueAsNumber: true })}
            type="number"
            className="input-field"
          />
        </div>

        {/* Fees */}
        <div className="flex flex-col">
          <label className="font-semibold">Fees</label>
          <input
            {...register("fees", { required: "Fees are required", valueAsNumber: true })}
            type="number"
            className="input-field"
          />
          {errors.fees && <span className="text-red-500">{errors.fees.message}</span>}
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2 flex flex-col">
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            rows="4"
            className="input-field"
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Update Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCamp;
