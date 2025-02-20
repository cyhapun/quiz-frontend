import { NavLink, Outlet, useNavigate} from "react-router-dom";
import "./style.scss";
import { deleteAllCookies, getCookie } from "../helper/cookie";

function LayoutDefault() {
    const navigate = useNavigate();
    const token = getCookie("token");
    const handleLogout = () => {
        navigate("/")
        deleteAllCookies();
        window.location.reload();
    }

    return (
        <>
            <div className="layoutDefault">
                <header className="layoutDefault__header">
                    <div className="layoutDefault__header--logo">
                        <a href={token ? "/home" : "/"}>Quiz</a>
                    </div>
                    {
                        token ? 
                        <div className="layoutDefault__header--menu--user">
                            <div className="layoutDefault__header--navigate">
                                <NavLink to="/home">Home</NavLink>
                                <NavLink to="/topic">Topic</NavLink>
                                <NavLink to="/answers">Answers</NavLink>
                            </div>
                            <button className="layoutDefault__header--button" onClick={handleLogout}>Logout</button>
                        </div>
                        :
                        <div className="layoutDefault__header--menu--guess">
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/register">Register</NavLink>
                        </div>
                    }
                </header>
                <main className="layoutDefault__main">
                    <Outlet></Outlet>
                </main>
                <footer className="layoutDefault__footer">
                    Copyright 2025 by CYHAPUN
                </footer>
            </div>
        </>
    )
};

export default LayoutDefault;