import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function Logout() {
    useEffect(() => {
        LogoutUser();
    }, [LogoutUser]);
    return <Navigate to="/login" />;
}

export default Logout;