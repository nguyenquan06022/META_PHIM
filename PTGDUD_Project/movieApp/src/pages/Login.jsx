import { useState, useContext } from "react";
import loginBg from "../assets/images/login_bg.jpg";
import { LoginContext } from "../global/LoginContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const { updateCurUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login-local",
        {
          username: name,
          password: pwd,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setSuccess(true);
        setError(null);
        const userId = res.data.user?._id;
        if (userId) {
          navigate(`/user/${userId}`);
        } else {
          alert("Đăng nhập thành công, nhưng không tìm thấy thông tin user.");
        }
      } else {
        setError(res.data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi đăng nhập.");
    }
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

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            Đăng nhập thành công!
          </div>
        )}

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
          onClick={handleLogin}
        >
          Đăng nhập
        </button>

        {/* <button
          className="btn btn-secondary d-flex"
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleGoogleLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "white" }}
          >
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
          </svg>
          Đăng nhập bằng Google
        </button> */}
      </div>
    </div>
  );
}

export default Login;
