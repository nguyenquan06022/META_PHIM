import { useState } from "react";
import loginBg from "../assets/images/login_bg.jpg";
import { Link } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

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
      <div
        style={{
          backgroundColor: "rgb(47, 52, 71)",
          padding: 30,
          borderRadius: "7px",
        }}
      >
        <h3 style={{ color: "white" }}>Đăng nhập</h3>
        <p style={{ color: "white" }}>
          Nếu bạn chưa có tài khoản,
          <span>
            <Link
              to="/signIn"
              style={{ textDecoration: "none", color: "rgb(235, 200, 113)" }}
            >
              {" đăng ký ngay"}
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

        <button
          className="btn btn-warning mb-3"
          style={{
            backgroundColor: "rgb(235, 200, 113)",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Login;
