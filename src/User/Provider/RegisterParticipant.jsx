import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc"; // For Google Icon
import { UserContext } from "@/User/Provider/AuthProvider";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/User/Common/Notification";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RegisterParticipant = () => {
  // Nagigate link
  const navigate = useNavigate();
  // AuthConnection
  const { registerNewAccount, updateDetails, loginWithGoogle } =
    useContext(UserContext);

  //   Send Data To Axios
  const sendDataToAxios = (fullName, email, photoURL, role) => {
    axios
      .post("https://backend-medicamp-a12.vercel.app/userinformations", {
        name: fullName,
        email: email,
        photoURL: photoURL,
        role: role,
      })
      .then((res) => {
        // console.log(res)
        if (res.status == 201) {
          notifySuccess(`${fullName} Registered as ${role}`).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        } else {
          notifyError("Already Have An Account!!").then((result) => {
            if (result.isConfirmed) {
              navigate("/user/login");
            }
          });
        }
      });
  };

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//   Handle register on submit form
  const handleRegister = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };


// on Submit set data
  const onSubmit = (data) => {
    console.log("Registration Data:", data);
    const { fullName, photoURL, email, password, role } = data;

    registerNewAccount(email, password)
      .then((res) => {
        console.log(res);
        // Account Opened But Name & Photo Not Updated In Firebase
        updateDetails(fullName, photoURL).then(() => {
          sendDataToAxios(fullName, email, photoURL, role);
        });
      })
      .catch((error) => {
        if (error) {
          notifyError("Already Have An Account!!").then((result) => {
            if (result.isConfirmed) {
              navigate("/user/login");
            }
          });
        }
      });
  };

  const handleGoogleSignIn = () => {
    const selectedRole = document.querySelector('input[name="role"]:checked');
    if (!selectedRole) {
      notifyWarning("Please select a role before signing up with Google.");
      return;
    }

    // Proceed with Google Sign-In logic
    const role = selectedRole.value;
    console.log(role);

    loginWithGoogle()
      .then((res) => {
        // console.log(res);
        const { displayName, photoURL, email } = res.user;
        console.log(displayName, photoURL, email);
        sendDataToAxios(displayName, email, photoURL, role);
      })
      .catch((error) => {
        if (error) {
          notifyError("Already Have An Account!!").then((result) => {
            if (result.isConfirmed) {
              navigate("/user/login");
            }
          });
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Photo URL Field */}
            <div>
              <Label htmlFor="photoURL">Photo URL</Label>
              <Input
                id="photoURL"
                type="url"
                placeholder="Enter your photo URL"
                {...register("photoURL", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/,
                    message: "Invalid photo URL",
                  },
                })}
              />
              {errors.photoURL && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <Label>Register as</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Participant"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <span>Participant</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Organizer"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <span>Organizer</span>
                </label>
              </div>
              {errors.role && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Register
            </Button>

            {/* Google Sign-In Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle size={20} /> Sign in with Google
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/user/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterParticipant;
