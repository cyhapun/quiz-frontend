import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helper/cookie";

function PrivateRoute() {
    const token = getCookie("token");

    return (
        <>
           {
                token ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>      
           }
        </>
    );
}

export default PrivateRoute;