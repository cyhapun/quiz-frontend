import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helper/cookie";

function PublicRoute() {
    const token = getCookie("token");

    return (
        <>
           {
                token ? <Navigate to="/home"></Navigate> : <Outlet></Outlet>     
           }
        </>
    );
}

export default PublicRoute;