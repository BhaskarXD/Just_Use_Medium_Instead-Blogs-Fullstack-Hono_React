import {Navigate} from 'react-router-dom';
import {useAuth} from "../hooks";
import React, {ReactNode} from "react";

const ProtectedRoute: React.FC<{children: ReactNode}> = ({ children }) => {
    const {isAuthenticated, loading} = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to={"/signin"}/>;
};

export default ProtectedRoute;