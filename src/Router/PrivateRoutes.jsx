import CurrentUserData from '@/Hooks/CurrentUserData';
import Loader from '@/User/Common/Loader';
import { UserContext } from '@/User/Provider/AuthProvider';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children, allowedRoles }) => {
    const { userParticipant } = useContext(UserContext);
    const { userData, loading } = CurrentUserData(userParticipant?.email);
    const location = useLocation();

    if (loading) {
        return <Loader />;
    }

    // If user is not logged in, redirect to login
    if (!userParticipant) {
        return <Navigate to="/user/login" state={{ from: location }} replace />;
    }

    // If user role is not allowed, redirect to their respective dashboard
    if (allowedRoles && !allowedRoles.includes(userData?.role)) {
        return <Navigate to={userData?.role === "Organizer" ? "/admin" : "/user"} replace />;
    }

    return children;
};

export default PrivateRoutes;
