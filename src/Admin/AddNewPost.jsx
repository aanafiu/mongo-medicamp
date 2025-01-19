import { notifySuccess } from "@/User/Common/Notification";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddNewPost = () => {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.fees = parseFloat(data.fees);
    console.log(data);
    axios.post("https://backend-medicamp-a12.vercel.app/allpost",data)
    .then(res=>{
        console.log(res.status)
        if(res.status === 201)
        {
            notifySuccess("Post Added Successfully")
            .then((result)=>{
                if(result.isConfirmed)
                {
                    navigate("/admin")
                }
            })
        }
    })
    // Submit the data to backend API
    // fetch("https://yourapi.com/addcamp", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=" mx-auto py-3 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Add A Camp</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Camp Name */}
        <div className="flex flex-col">
          <label className="font-semibold">Camp Name</label>
          <input
            {...register("campName", { required: "Camp Name is required" })}
            type="text"
            placeholder="Enter Camp Name"
            className="input-field"
          />
          {errors.campName && <span className="text-red-500">{errors.campName.message}</span>}
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label className="font-semibold">Image URL</label>
          <input
            {...register("image", { required: "Image URL is required" })}
            type="text"
            placeholder="Enter Image URL"
            className="input-field"
          />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}
        </div>

        {/* Camp Fees */}
        <div className="flex flex-col">
          <label className="font-semibold">Camp Fees</label>
          <input
            {...register("fees", { required: "Fees are required", min: 0,valueAsNumber: true })}
            type="number"
            placeholder="Enter Fees"
            className="input-field"
          />
          {errors.fees && <span className="text-red-500">{errors.fees.message}</span>}
        </div>

        {/* Date & Time */}
        <div className="flex flex-col">
          <label className="font-semibold">Date & Time</label>
          <input
            {...register("dateTime", { required: "Date & Time are required" })}
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
            placeholder="Enter Location"
            className="input-field"
          />
          {errors.location && <span className="text-red-500">{errors.location.message}</span>}
        </div>

        {/* Healthcare Professional Name */}
        <div className="flex flex-col">
          <label className="font-semibold">Healthcare Professional</label>
          <input
            {...register("healthcareName", { required: "Name is required" })}
            type="text"
            placeholder="Enter Professional Name"
            className="input-field"
          />
          {errors.healthcareName && <span className="text-red-500">{errors.healthcareName.message}</span>}
        </div>

        {/* Participant Count */}
        <div className="flex flex-col">
          <label className="font-semibold">Participant Count (Starts at 0)</label>
          <input
            {...register("participantCount", { required: false, valueAsNumber: true })}
            type="number"
            placeholder={0}
            defaultValue={0}
            className="input-field"
          />
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2 flex flex-col">
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter camp description..."
            rows="4"
            className="input-field"
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Add Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;
