import UserLayout from "@/Layout/UserLayout/UserLayout";
import Home from "@/User/Common/Home";
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
            path:"test",
            element:<Test></Test>
        },
      ]
    },

  ]);