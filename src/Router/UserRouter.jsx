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
import SingleCampUser from "@/User/Common/SingleCampUser";
import DashBoardUser from "@/User/DashBoard/DashBoardUser";
import ManageMyRegistrations from "@/User/DashBoard/ManageMyRegistrations";
import Payment from "@/User/DashBoard/Payment";
import UserProfile from "@/User/DashBoard/UserProfile";
import UserRegisteredCamp from "@/User/DashBoard/UserRegisteredCamp";
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
                path:"allcamps/:id",
                element:<SingleCampUser/>
            },
            {
                path:"dashboard",
                element:<DashBoardUser></DashBoardUser>,
                children:[
                    {
                        path:"profile",
                        element:<UserProfile></UserProfile>
                    },
                    {
                        path:"manage-camps",
                        element:<UserRegisteredCamp></UserRegisteredCamp>
                    },
                    {
                        path:"manage-my-camps",
                        element:<ManageMyRegistrations></ManageMyRegistrations>
                    },
                    {
                        path:"payment/:campId",
                        element:<Payment/>
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