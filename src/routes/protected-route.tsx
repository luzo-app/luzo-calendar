import {
    Navigate,
    Outlet,
    useLocation
} from "react-router";

import { useAuth } from "@/hooks/use-auth";

import { routes } from "@/data";

export const ProtectedRoute = () => {
    const { token, user } = useAuth();
    const location = useLocation();

    // Check if the user is authenticated
    if (!token || !user) {
        // If not authenticated, redirect to the login page
        return <Navigate to={`${routes.LOGIN}?redirectUrl=${location.pathname}${location.search}`} />;
    }

    return (
        <Outlet />
    )
};