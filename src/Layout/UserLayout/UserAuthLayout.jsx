import Nav from "@/User/Common/Nav";
import { Outlet } from "react-router-dom";

const UserAuthLayout = () => {
    return (
        <div className="container mx-auto my-5">
        <Nav></Nav>
        <Outlet></Outlet>
      </div>
    );
};

export default UserAuthLayout;