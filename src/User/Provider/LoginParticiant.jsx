import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // ShadCN Input component
import { Button } from "@/components/ui/button"; // ShadCN Button component
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // ShadCN Card components
import { Label } from "@/components/ui/label"; // ShadCN Label component
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/User/Provider/AuthProvider";
import {
  notifyLogin,
  notifySuccess,
  notifyWarning,
} from "@/User/Common/Notification";

const LoginParticipant = () => {
  // Nagigate link
  const navigate = useNavigate();
  // AuthConnection
  const { loginWithGoogle } = useContext(UserContext);

  //   Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    alert("Login Successful!");
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle().then((res) => {
      // console.log(res);
      const { displayName, photoURL, email } = res.user;
      console.log(displayName, photoURL, email);
      notifyLogin(`Welcome, ${displayName}`)
      .then(()=>{
        navigate("/")
      })
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/user/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </CardContent>
        <CardContent>
          {/* Google Sign-In Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} /> Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginParticipant;
