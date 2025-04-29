import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function User() {
  const { id } = useParams();
  const [userName, setUserName] = useState("quanidol62");
  const [activeTab, setActiveTab] = useState("account");
  const [showModal, setShowModal] = useState(false);
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const [hoveredAvatar, setHoveredAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatar/01.jpg");
  const avatarList = Array.from(
    { length: 13 },
    (_, i) => `/avatar/${String(i + 1).padStart(2, "0")}.jpg`
  );

  const notify = (mes, type) => {
    switch (type) {
      case "success": {
        toast.success(mes);
        break;
      }
      case "fail": {
        toast.error(mes);
        break;
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "favorites":
        return <div>Nội dung Yêu thích sẽ hiển thị ở đây</div>;
      case "watch-later":
        return <div>Nội dung Xem sau sẽ hiển thị ở đây</div>;
      case "continue-watching":
        return <div>Nội dung Xem tiếp sẽ hiển thị ở đây</div>;
      case "account":
      default:
        return (
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value="nguyenquan06022004@gmail.com"
                  readOnly
                  style={{
                    backgroundColor: "#1F2029",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tên hiển thị</label>
                <input
                  type="text"
                  className="form-control"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    backgroundColor: "#1F2029",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <button
                className="btn"
                style={{
                  backgroundColor: "rgb(235, 200, 113)",
                  color: "#000",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
                onClick={() => notify("Cập nhật thành công", "success")}
              >
                Cập nhật
              </button>

              <p className="mt-3" style={{ color: "#aaa" }}>
                Đổi mật khẩu, nhấn vào{" "}
                <a
                  role="button"
                  style={{ color: "#FFD43B", cursor: "pointer" }}
                  onClick={() => setShowModal(true)}
                >
                  đây
                </a>
              </p>
            </div>

            <div className="col-md-4 text-center">
              <img
                src="/avatar/01.jpg"
                alt="avatar"
                className="rounded-circle"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  border: "2px solid #FFD43B",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setShowModalAvatar(true);
                }}
              />
              <p className="mt-3">Đổi ảnh đại diện</p>
            </div>
          </div>
        );
    }
  };

  const handleAvatarSelect = (avatarPath) => {
    setSelectedAvatar(avatarPath);
  };

  const handleAvatarSave = () => {
    // In a real application, you would send the selectedAvatar to your backend
    notify("Ảnh đại diện đã được cập nhật!", "success");
    setShowModalAvatar(false);
  };

  const handleAvatarHover = (avatarPath) => {
    setHoveredAvatar(avatarPath);
  };

  const handleAvatarMouseLeave = () => {
    setHoveredAvatar(null);
  };

  //load infor user
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get("http://localhost:3000/getUserInfor", {
          withCredentials: true,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [id]);

  return (
    <div
      className="container-fluid"
      style={{ minHeight: "100vh", color: "white", padding: 20 }}
    >
      <ToastContainer
        toastClassName="custom-toast-left-center"
        position="top-right"
      ></ToastContainer>

      {/* Modal for password change (keep this as is) */}
      {showModal && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowModal(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(19, 23, 39,0.8)",
              zIndex: 999,
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgb(42, 49, 78)",
              padding: "40px 20px",
              borderRadius: "12px",
              zIndex: 1000,
              width: "90%",
              maxWidth: "400px",
              color: "white",
            }}
          >
            <h4 style={{ textAlign: "center" }}>Đổi mật khẩu</h4>

            {/* Label và Input Mật khẩu cũ */}
            <div className="mb-3">
              <label htmlFor="oldPassword" style={{ color: "grey" }}>
                Mật khẩu cũ
              </label>
              <input
                type="password"
                id="oldPassword"
                className="form-control"
                style={{
                  marginTop: 20,
                  backgroundColor: "#2A314E",
                  border: "1px solid grey",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
            </div>

            {/* Label và Input Mật khẩu mới */}
            <div className="mb-3">
              <label htmlFor="newPassword" style={{ color: "grey" }}>
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                style={{
                  marginTop: 20,
                  backgroundColor: "#2A314E",
                  border: "1px solid grey",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
            </div>

            {/* Label và Input Nhập lại mật khẩu mới */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" style={{ color: "grey" }}>
                Nhập lại mật khẩu mới
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                style={{
                  marginTop: 20,
                  backgroundColor: "#2A314E",
                  borderRadius: "8px",
                  color: "white",
                  border: "1px solid grey",
                }}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn"
                style={{
                  backgroundColor: "rgb(235, 200, 113)",
                  color: "#000",
                  fontWeight: "bold",
                  marginRight: 10,
                }}
                onClick={() => {
                  // Xử lý đổi mật khẩu ở đây
                  setShowModal(false);
                  notify("Đổi mật khẩu thành công!", "success");
                }}
              >
                Đổi mật khẩu
              </button>
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </>
      )}

      {showModalAvatar && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowModalAvatar(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(19, 23, 39, 0.8)",
              zIndex: 999,
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgb(42, 49, 78)",
              padding: "35px",
              borderRadius: "12px",
              zIndex: 1000,
              width: "90%",
              maxWidth: "600px",
              color: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ textAlign: "left", margin: 0 }}>Đổi ảnh đại diện</h4>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModalAvatar(false)}
                aria-label="Close"
                style={{ fontSize: "15px" }}
              ></button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                gap: "10px",
                marginBottom: "20px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {avatarList.map((avatar) => (
                <div
                  key={avatar}
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={() => handleAvatarHover(avatar)}
                  onMouseLeave={handleAvatarMouseLeave}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <img
                    src={avatar}
                    alt="avatar option"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      filter:
                        hoveredAvatar === avatar
                          ? "brightness(1.2)"
                          : "brightness(0.8)",
                    }}
                  />
                  {selectedAvatar === avatar && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "2px solid #FFD43B",
                        borderRadius: "8px",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="btn"
                style={{
                  backgroundColor: "rgb(235, 200, 113)",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  marginRight: 10,
                }}
                onClick={handleAvatarSave}
              >
                Lưu
              </button>
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowModalAvatar(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </>
      )}

      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 d-flex flex-column"
          style={{
            backgroundColor: "rgb(37, 39, 47)",
            padding: "30px",
            borderRadius: "12px 12px 12px 12px",
          }}
        >
          <h4 className="mb-4">Quản lý tài khoản</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <button
              className={`btn btn-hover no-border ${
                activeTab === "favorites" ? "btn-warning" : "btn-secondary"
              }`}
              style={{
                border: "none !important",
                marginBottom: "10px",
                textAlign: "left",
              }}
              onClick={() => setActiveTab("favorites")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
              </svg>
              {" Yêu thích"}
            </button>
            <button
              className={`btn btn-hover no-border ${
                activeTab === "watch-later" ? "btn-warning" : "btn-secondary"
              }`}
              style={{
                border: "none !important",
                marginBottom: "10px",
                textAlign: "left",
              }}
              onClick={() => setActiveTab("watch-later")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
              >
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
              </svg>
              {" Xem sau"}
            </button>
            <button
              className={`btn btn-hover no-border ${
                activeTab === "continue-watching"
                  ? "btn-warning"
                  : "btn-secondary"
              }`}
              style={{
                border: "none !important",
                marginBottom: "10px",
                textAlign: "left",
              }}
              onClick={() => setActiveTab("continue-watching")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
              >
                <path d="M19.89 10.105a8.696 8.696 0 0 0-.789-1.456l-1.658 1.119a6.606 6.606 0 0 1 .987 2.345 6.659 6.659 0 0 1 0 2.648 6.495 6.495 0 0 1-.384 1.231 6.404 6.404 0 0 1-.603 1.112 6.654 6.654 0 0 1-1.776 1.775 6.606 6.606 0 0 1-2.343.987 6.734 6.734 0 0 1-2.646 0 6.55 6.55 0 0 1-3.317-1.788 6.605 6.605 0 0 1-1.408-2.088 6.613 6.613 0 0 1-.382-1.23 6.627 6.627 0 0 1 .382-3.877A6.551 6.551 0 0 1 7.36 8.797 6.628 6.628 0 0 1 9.446 7.39c.395-.167.81-.296 1.23-.382.107-.022.216-.032.324-.049V10l5-4-5-4v2.938a8.805 8.805 0 0 0-.725.111 8.512 8.512 0 0 0-3.063 1.29A8.566 8.566 0 0 0 4.11 16.77a8.535 8.535 0 0 0 1.835 2.724 8.614 8.614 0 0 0 2.721 1.833 8.55 8.55 0 0 0 5.061.499 8.576 8.576 0 0 0 6.162-5.056c.22-.52.389-1.061.5-1.608a8.643 8.643 0 0 0 0-3.45 8.684 8.684 0 0 0-.499-1.607z"></path>
              </svg>
              {" Xem tiếp"}
            </button>
            <button
              className={`btn btn-hover no-border ${
                activeTab === "account" ? "btn-warning" : "btn-secondary"
              }`}
              style={{
                border: "none !important",
                marginBottom: "10px",
                textAlign: "left",
              }}
              onClick={() => setActiveTab("account")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "white" }}
              >
                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
              </svg>
              {" Tài khoản"}
            </button>
            <button
              className="btn btn-secondary btn-hover no-border"
              style={{ border: "none !important", textAlign: "left" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ color: "white" }}
              >
                <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
              </svg>
              {" Đăng xuất"}
            </button>
          </ul>
        </div>

        {/* Main content */}
        <div className="col-md-9 p-5">
          {activeTab === "account" && (
            <>
              <h3 className="mb-2">Tài khoản</h3>
              <p style={{ color: "#aaa" }}>Cập nhật thông tin tài khoản</p>
            </>
          )}
          {activeTab === "favorites" && (
            <>
              <h3 className="mb-2">Yêu thích</h3>
              <p style={{ color: "#aaa" }}>Danh sách phim bạn đã yêu thích</p>
            </>
          )}
          {activeTab === "watch-later" && (
            <>
              <h3 className="mb-2">Xem sau</h3>
              <p style={{ color: "#aaa" }}>Danh sách phim bạn muốn xem sau</p>
            </>
          )}
          {activeTab === "continue-watching" && (
            <>
              <h3 className="mb-2">Xem tiếp</h3>
              <p style={{ color: "#aaa" }}>
                Tiếp tục xem những phim bạn đang xem dở
              </p>
            </>
          )}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
export default User;
