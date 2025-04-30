import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginBg from "../assets/images/login_bg.jpg";
import { Link } from "react-router-dom";

function SignIn() {
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [rePwd, setRePwd] = useState("");
    const navigate = useNavigate();

    // Hàm xử lý đã bị bỏ đi. Bạn có thể gọi handle từ bên ngoài hoặc thêm sau.
    const handleSubmit = () => {
        // Xử lý đăng ký được tách riêng, có thể nhận qua props hoặc hook
    };

    return (
        <div
            style={{
                width: "100%",
                height: "90vh",
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginBg}) center/cover no-repeat`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ToastContainer />
            <div
                style={{
                    backgroundColor: "rgb(47, 52, 71)",
                    padding: 30,
                    borderRadius: "7px",
                }}
            >
                <h3 style={{ color: "white" }}>Đăng ký</h3>
                <p style={{ color: "white" }}>
                    Nếu bạn đã có tài khoản hãy
                    <span>
                        <Link
                            to="/login"
                            style={{ textDecoration: "none", color: "rgb(235, 200, 113)" }}
                        >
                            {" đăng nhập"}
                        </Link>
                    </span>
                </p>
                <div className="mb-3">
                    <label
                        htmlFor="name"
                        className="form-label"
                        style={{ color: "white" }}
                    >
                        Tên tài khoản
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="pwd"
                        className="form-label"
                        style={{ color: "white" }}
                    >
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        name="pwd"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="rePwd"
                        className="form-label"
                        style={{ color: "white" }}
                    >
                        Nhập lại mật khẩu
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="rePwd"
                        name="rePwd"
                        value={rePwd}
                        onChange={(e) => setRePwd(e.target.value)}
                    />
                </div>
                <button
                    className="btn btn-warning mb-3"
                    style={{
                        backgroundColor: "rgb(235, 200, 113)",
                        fontWeight: "bold",
                        width: "100%",
                    }}
                    onClick={handleSubmit}
                >
                    Đăng ký
                </button>
            </div>
        </div>
    );
}

export default SignIn;
