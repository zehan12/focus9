import { ROUTES } from "@/constants";
import { useAppSelector } from "@/hooks";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    console.log("route")
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated)
    return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} />;
};

