import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { notifySuccess } from "@/User/Common/Notification";

const FreeConsultation = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        notifySuccess("Your request has been submitted! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="container mx-auto my-16 p-6 glass text-primary rounded-lg shadow-lg">
            <motion.h2
                className="text-3xl md:text-4xl font-bold text-center underline mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Get a Free Consultation
            </motion.h2>
            <p className="text-lg text-center mb-6">
                Need guidance? Fill out the form below, and our team will connect with you shortly.
            </p>

            <motion.form
                className="flex flex-col gap-4 max-w-lg mx-auto p-6 rounded-lg "
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
            >
                {/* Name Input */}
                <div className="flex items-center rounded-lg p-2">
                    <FaUser className="text-primary mr-2" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full outline-none  bg-transparent"
                    />
                </div>

                {/* Email Input */}
                <div className="flex items-center  rounded-lg p-2">
                    <FaEnvelope className="text-primary mr-2" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full outline-none  bg-transparent"
                    />
                </div>

                {/* Message Input */}
                <div className="flex items-start  rounded-lg p-2">
                    <FaPhoneAlt className="text-primary mr-2 mt-2" />
                    <textarea
                        name="message"
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full h-24 outline-none  bg-transparent resize-none"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        type="submit"
                        className="w-full text-lg font-semibold transition-all text-white p-3 rounded-lg"
                    >
                        Request Free Consultation
                    </Button>
                </motion.div>
            </motion.form>
        </div>
    );
};

export default FreeConsultation;
