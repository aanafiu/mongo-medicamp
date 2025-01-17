import FooterSection from "@/components/sections/footer/FooterSection";
import Nav from "@/User/Common/Nav";
import { Outlet } from "react-router-dom";

const UserAuthLayout = () => {
    return (
        <div className="container mx-auto my-5">
        <Nav></Nav>
        <div className="min-h-screen bg-red-400">
        <Outlet></Outlet>
        </div>
        <FooterSection></FooterSection>
      </div>
    );
};

export default UserAuthLayout;