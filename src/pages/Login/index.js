import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { login } from "../../Services/userServices";
import { setCookie } from "../../helper/cookie";

function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        const email = e.target[0].value;
        const password = e.target[1].value;
        const response = await login(email, password);

        if (response.length > 0) {
            navigate("/home");
            setCookie("id", response[0].id, 1);
            setCookie("fullName", response[0].fullName, 1);
            setCookie("email", response[0].email, 1);
            setCookie("token", response[0].token, 1);
            window.location.reload();
            alert("Đăng nhập thành công!");
        }
        else {
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    }

    return (
        <>
            <form className="formLogin" onSubmit={handleSubmit}>
                <h3 className="formLogin__label">Login Quiz</h3>
                <input className="formLogin__input" placeholder="Nhập email"></input>
                <br></br>
                <input type="password" className="formLogin__input" placeholder="Nhập mật khẩu"></input>
                <br></br>
                <button type="submit" className="formLogin__button">Login</button>
                <br></br>
                <Link to="/register" className="formLogin__support">Chưa có tài khoản?</Link>
            </form>
        </>
    );
};

export default Login;