import {Navigate} from 'react-router-dom';
import {useAuth} from "../hooks";

const ProtectedRoute = (props) => {
    const {isAuthenticated, loading} = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? props.children : <Navigate to={"/signin"}/>;
};

export default ProtectedRoute;