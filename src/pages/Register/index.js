import { Link, useNavigate } from "react-router-dom";
import randomToken from "../../components/randomToken";
import { checkUserExist, register } from "../../Services/userServices";

function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameUser = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const repassword = e.target[3].value;
        const user = {
            // id: Date.now(),
            fullName: nameUser,
            email: email,
            password: password,
            token: randomToken()
        }
        const duplicate = await checkUserExist('email', email);
  
        if (duplicate.length !== 0) {
            alert("Email is existed, please try another!");
            return;
        }
        if (repassword !== password) {
            alert("Repassword is not equal to password, please try again!");
            return;
        }
        const result = await register(user);
        
        if (result) {
            alert("Tạo tài khoản thành công!");
            navigate("/login");
        }
        else {
            alert("Tạo tài khoản không thành công, vui lòng thử lại!");
        }
    }

    return (
        <>
            <form className="formLogin" onSubmit={handleSubmit}>
                <h3 className="formLogin__label">Register Quiz</h3>
                <p>Lưu ý: Đăng ký có thể đợi lâu do khởi động server jsonserver (khoảng 2-3 phút)</p>
                <input className="formLogin__input" placeholder="Nhập họ và tên"></input>
                <br></br>
                <input className="formLogin__input" placeholder="Nhập email"></input>
                <br></br>
                <input type="password" className="formLogin__input" placeholder="Nhập mật khẩu"></input>
                <br></br>
                <input type="password" className="formLogin__input" placeholder="Xác nhận lại mật khẩu"></input>
                <br></br>
                <button type="submit" className="formLogin__button">Register</button>
                <br></br>
                <Link to="/login" className="formLogin__support">Đã có tài khoản?</Link>
            </form>
        </>
    );
};

export default Register;