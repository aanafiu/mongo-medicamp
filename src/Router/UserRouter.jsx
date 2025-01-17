import AddNewPost from "@/Admin/AddNewPost";
import AdminProfile from "@/Admin/AdminProfile";
import DashBoardAdmin from "@/Admin/DashBoardAdmin";
import ManageCamp from "@/Admin/ManageCamp";
import SingleCamp from "@/Admin/SingleCamp";
import UpdateCamp from "@/Admin/UpdateCamp";
import UserAuthLayout from "@/Layout/UserLayout/UserAuthLayout";
import UserLayout from "@/Layout/UserLayout/UserLayout";
import AllCampsDetails from "@/User/Common/AllCampsDetails";
import Home from "@/User/Common/Home";
import DashBoardUser from "@/User/DashBoard/DashBoardUser";
import UserProfile from "@/User/DashBoard/UserProfile";
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
            path:"allcamps",
            element:<AllCampsDetails></AllCampsDetails>
        },
        {
            path:"test",
            element:<Test></Test>
        },
      ]
    },
    {
        path:"/user",
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
            },
            {
                path:"dashboard",
                element:<DashBoardUser></DashBoardUser>,
                children:[
                    {
                        path:"profile",
                        element:<UserProfile></UserProfile>
                    },
                ]
            },
          
        ]
    },
    {
        path: "/admin/",
        element: <DashBoardAdmin/>,
        children:[
          {
              path:"",
              element:<AdminProfile></AdminProfile>
          },
          {
              path:"profile",
              element:<AdminProfile></AdminProfile>
          },
          {
              path:"addnewpost",
              element:<AddNewPost></AddNewPost>
          },
          {
              path:"manageallcamps",
              element: <ManageCamp></ManageCamp>
          },
          {
              path:"allposts/:id",
              element: <SingleCamp></SingleCamp>
          },
          {
              path:"allposts/update-camp/:id",
              element: <UpdateCamp></UpdateCamp>
          },
          {
              path:"test",
              element:<Test></Test>
          },
        ]
      },

  ]);