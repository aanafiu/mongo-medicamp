import UserAuthLayout from "@/Layout/UserLayout/UserAuthLayout";
import UserLayout from "@/Layout/UserLayout/UserLayout";
import Home from "@/User/Common/Home";
import DashBoardUser from "@/User/DashBoard/DashBoardUser";
import LoginParticipant from "@/User/Provider/LoginParticiant";
import RegisterParticipant from "@/User/Provider/RegisterParticipant";
import Test from "@/User/Test";
import {
    createBrowserRouter,

  } from "react-router-dom";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout></UserLayout>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"dashboard",
            element:<DashBoardUser></DashBoardUser>
        },
        {
            path:"test",
            element:<Test></Test>
        },
      ]
    },
    {
        path:"/user/",
        element:<UserAuthLayout/>,
        children:[
            {
                path:"",
                element:<LoginParticipant></LoginParticipant>
            },
            {
                path:"login",
                element:<LoginParticipant></LoginParticipant>
            },
            {
                path:"register",
                element:<RegisterParticipant/>
            }
        ]
    }

  ]);