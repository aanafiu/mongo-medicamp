import { notifySuccess } from "@/User/Common/Notification";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AddNewPost = () => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // 🔹 Image Upload Function
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
                alert("Image upload failed.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (data) => {
        data.fees = parseFloat(data.fees);
        data.image = imageUrl; // 🔹 Attach uploaded image URL

        if (!data.image) {
            alert("Please upload an image.");
            return;
        }

        console.log(data);
        axios.post("https://backend-medicamp-a12.vercel.app/allpost", data)
            .then(res => {
                if (res.status === 201) {
                    notifySuccess("Post Added Successfully").then((result) => {
                        if (result.isConfirmed) {
                            navigate("/admin");
                        }
                    });
                }
            });
    };

    return (
        <div className="w-full mx-auto py-3 rounded-lg">
            <h2 className="text-3xl font-bold mb-5 text-center underline">Add A Camp</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* Image Upload */}
                <div className="col-span-2 flex flex-col gap-3 justify-center items-center ">
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
                        placeholder="Enter Camp Name"
                        className="input-field"
                    />
                    {errors.campName && <span className="text-red-500">{errors.campName.message}</span>}
                </div>

                {/* Camp Fees */}
                <div className="flex flex-col">
                    <label className="font-semibold">Camp Fees</label>
                    <input
                        {...register("fees", { required: "Fees are required", min: 0, valueAsNumber: true })}
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
                    <Button type="submit" className=" text-white px-6 py-2 rounded-md ">
                        Add Camp
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewPost;
