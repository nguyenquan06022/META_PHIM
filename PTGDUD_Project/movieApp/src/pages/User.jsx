"use client";

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../global/LoginContext";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Image,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Heart,
  Plus,
  RotateCcw,
  User,
  LogOut,
  Play,
  X,
  Info,
} from "lucide-react";
import "../assets/css/userProfile.css"; // Import the dedicated CSS file

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCurUser } = useContext(LoginContext);
  const [userName, setUserName] = useState("quanidol62");
  const [userForUpdate, setUserForUpdate] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [hoveredAvatar, setHoveredAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatar/01.jpg");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState(null);

  const avatarList = [
    "/avatar/01.jpg",
    "/avatar/02.jpg",
    "/avatar/03.jpg",
    "/avatar/04.jpg",
    "/avatar/05.jpg",
    "/avatar/06.jpg",
    "/avatar/07.jpg",
    "/avatar/08.jpg",
    "/avatar/09.jpg",
    "/avatar/10.jpg",
    "/avatar/11.jpg",
    "/avatar/12.jpg",
    "/avatar/13.jpg",
  ];

  const favoriteMovies = [
    {
      id: 1,
      title: "Avengers: Endgame - The Epic Conclusion to the Infinity Saga",
      year: 2019,
      image:
        "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
      genre: "Action, Adventure",
    },
    {
      id: 2,
      title: "Joker",
      year: 2019,
      image:
        "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      genre: "Crime, Drama",
    },
    {
      id: 3,
      title: "Parasite",
      year: 2019,
      image:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
      genre: "Thriller, Drama",
    },
    {
      id: 4,
      title:
        "The Dark Knight - The Legend of the Batman Continues with the Joker",
      year: 2008,
      image:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      genre: "Action, Crime",
    },
    {
      id: 5,
      title: "Inception",
      year: 2010,
      image:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      genre: "Sci-Fi, Action",
    },
    {
      id: 6,
      title: "Interstellar",
      year: 2014,
      image:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      genre: "Sci-Fi, Adventure",
    },
    {
      id: 15,
      title: "Spider-Man: Into the Spider-Verse",
      year: 2018,
      image:
        "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg",
      genre: "Animation, Action",
    },
    {
      id: 16,
      title:
        "The Shawshank Redemption: Extended Director's Cut with Additional Scenes",
      year: 1994,
      image:
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      genre: "Drama",
    },
    {
      id: 17,
      title: "The Godfather",
      year: 1972,
      image:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Crime, Drama",
    },
    {
      id: 18,
      title: "Pulp Fiction",
      year: 1994,
      image:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Crime, Drama",
    },
  ];

  const watchLaterMovies = [
    {
      id: 7,
      title: "The Shawshank Redemption",
      year: 1994,
      image:
        "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      genre: "Drama",
    },
    {
      id: 8,
      title: "The Godfather",
      year: 1972,
      image:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Crime, Drama",
    },
    {
      id: 9,
      title: "Pulp Fiction",
      year: 1994,
      image:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Crime, Drama",
    },
    {
      id: 10,
      title:
        "The Lord of the Rings: The Return of the King - Extended Edition with Additional Footage",
      year: 2003,
      image:
        "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Adventure, Fantasy",
    },
    {
      id: 19,
      title: "The Matrix",
      year: 1999,
      image:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      genre: "Action, Sci-Fi",
    },
    {
      id: 20,
      title: "Goodfellas",
      year: 1990,
      image:
        "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Biography, Crime",
    },
    {
      id: 21,
      title: "The Silence of the Lambs",
      year: 1991,
      image:
        "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      genre: "Crime, Drama, Thriller",
    },
    {
      id: 22,
      title: "Schindler's List",
      year: 1993,
      image:
        "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      genre: "Biography, Drama, History",
    },
  ];

  const continueWatchingMovies = [
    {
      id: 11,
      title: "Fight Club",
      year: 1999,
      image:
        "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Drama",
      progress: 65,
    },
    {
      id: 12,
      title: "Forrest Gump",
      year: 1994,
      image:
        "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      genre: "Drama, Romance",
      progress: 30,
    },
    {
      id: 13,
      title: "The Matrix",
      year: 1999,
      image:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      genre: "Action, Sci-Fi",
      progress: 45,
    },
    {
      id: 14,
      title: "Goodfellas",
      year: 1990,
      image:
        "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      genre: "Biography, Crime",
      progress: 80,
    },
    {
      id: 23,
      title:
        "The Departed - Extended Cut with Director's Commentary and Behind the Scenes",
      year: 2006,
      image:
        "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg",
      genre: "Crime, Drama, Thriller",
      progress: 15,
    },
    {
      id: 24,
      title: "Gladiator",
      year: 2000,
      image:
        "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      genre: "Action, Adventure, Drama",
      progress: 50,
    },
    {
      id: 25,
      title: "The Green Mile",
      year: 1999,
      image:
        "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg",
      genre: "Crime, Drama, Fantasy",
      progress: 75,
    },
  ];

  const handleUpdateUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/update-user",
        userData,
        {
          withCredentials: true, // để gửi cookie nếu bạn dùng session
        }
      );
      if (response.data.success) {
        console.log("Cập nhật thành công:", response.data.user);
      } else {
        console.warn("Không thể cập nhật:", response.data.message);
      }
      fetchData();
      updateCurUser();
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  const handleAvatarSelect = (avatarPath) => {
    setUserForUpdate({ ...userForUpdate, avt: avatarPath });
    setSelectedAvatar(avatarPath);
  };

  const handleAvatarSave = () => {
    handleUpdateUser(userForUpdate);
    toast.success("Ảnh đại diện đã được cập nhật!");
    setShowAvatarModal(false);
  };

  const handleUpdateProfile = () => {
    handleUpdateUser(userForUpdate);
    // In a real application, you would send the updated profile to your backend
    toast.success("Cập nhật thành công");
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới không khớp!");
      return;
    } else if (oldPassword != user.password) {
      toast.error("Mật khẩu cũ của bạn không khớp");
      return;
    }
    handleUpdateUser(userForUpdate);
    handleCloseModal();
    toast.success("Đổi mật khẩu thành công!");
  };

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:3000/getUserInfor", {
        withCredentials: true,
      });
      setUser(res.data);
      setUserForUpdate({
        username: res.data.username,
        password: res.data.password,
        avt: res.data.avt,
        gg_id: "",
      });
      //#
      setUserName(res.data.username);
      setSelectedAvatar(res.data.avt);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        console.log("Đăng xuất thành công");
        updateCurUser();
        navigate("/login");
      } else {
        console.warn(res.data.message);
      }
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const renderMovieGrid = (movies, showProgress = false) => {
    return (
      <Row className="g-3 mp-equal-height-columns">
        {movies.map((movie) => (
          <Col xs={6} sm={4} md={3} key={movie.id}>
            <div className="mp-movie-card">
              <img src={movie.image || "/placeholder.svg"} alt={movie.title} />
              <div className="mp-movie-actions">
                <button className="mp-action-btn">
                  <Play size={14} />
                </button>
                <button className="mp-action-btn">
                  <Info size={14} />
                </button>
                {!showProgress && (
                  <button className="mp-action-btn">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="mp-overlay">
                <div className="mp-title" title={movie.title}>
                  {movie.title}
                </div>
                <div className="mp-info">
                  {movie.year} • {movie.genre}
                </div>
                {showProgress && (
                  <ProgressBar now={movie.progress} className="mp-progress" />
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "favorites":
        return (
          <Card className="mp-card mp-main-content-card">
            <Card.Body className="p-4">
              <div className="mb-4">
                <h2 className="text-white fs-3 fw-bold mp-gradient-heading">
                  Yêu thích
                </h2>
                <p className="mp-text-secondary">
                  Danh sách phim bạn đã yêu thích
                </p>
              </div>
              <div className="mp-scrollable-content">
                {renderMovieGrid(favoriteMovies)}
              </div>
            </Card.Body>
          </Card>
        );
      case "watch-later":
        return (
          <Card className="mp-card mp-main-content-card">
            <Card.Body className="p-4">
              <div className="mb-4">
                <h2 className="text-white fs-3 fw-bold mp-gradient-heading">
                  Xem sau
                </h2>
                <p className="mp-text-secondary">
                  Danh sách phim bạn muốn xem sau
                </p>
              </div>
              <div className="mp-scrollable-content">
                {renderMovieGrid(watchLaterMovies)}
              </div>
            </Card.Body>
          </Card>
        );
      case "continue-watching":
        return (
          <Card className="mp-card mp-main-content-card">
            <Card.Body className="p-4">
              <div className="mb-4">
                <h2 className="text-white fs-3 fw-bold mp-gradient-heading">
                  Xem tiếp
                </h2>
                <p className="mp-text-secondary">
                  Tiếp tục xem những phim bạn đang xem dở
                </p>
              </div>
              <div className="mp-scrollable-content">
                {renderMovieGrid(continueWatchingMovies, true)}
              </div>
            </Card.Body>
          </Card>
        );
      case "account":
      default:
        return (
          <Card className="mp-card mp-main-content-card">
            <Card.Body className="p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                <div>
                  <h2 className="text-white fs-3 fw-bold mp-gradient-heading">
                    Tài khoản
                  </h2>
                  <p className="mp-text-secondary">
                    Cập nhật thông tin tài khoản
                  </p>
                </div>
              </div>

              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label className="mp-form-label">
                      Tên hiển thị
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        setUserForUpdate({
                          ...userForUpdate,
                          username: e.target.value,
                        });
                      }}
                      className="mp-form-control"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="mp-form-label">Mật khẩu</Form.Label>
                    <Form.Control
                      type="password"
                      value={user ? user.password : ""}
                      readOnly
                      className="mp-form-control"
                      disabled
                    />
                  </Form.Group>

                  <Button
                    style={{
                      backgroundColor: "rgb(235,200,113)",
                      border: "none",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                    onClick={handleUpdateProfile}
                    className="mb-3 mp-btn"
                  >
                    Cập nhật
                  </Button>

                  <p className="mp-text-secondary">
                    Đổi mật khẩu, nhấn vào{" "}
                    <Button
                      variant="link"
                      onClick={() => setShowPasswordModal(true)}
                      className="p-0 text-decoration-none"
                      style={{ color: "rgb(235,200,113)" }}
                    >
                      đây
                    </Button>
                  </p>
                </Col>

                <Col md={4} className="text-center">
                  <div className="position-relative d-inline-block">
                    <Image
                      src={selectedAvatar || "/placeholder.svg"}
                      alt="User avatar"
                      roundedCircle
                      className="mp-rounded-circle"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        border: "4px solid rgb(235, 200, 113)",
                        boxShadow: "0 8px 20px rgba(235, 200, 113, 0.2)",
                      }}
                    />
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 rounded-circle d-flex align-items-center justify-content-center opacity-0 mp-hover-opacity-100"
                      style={{
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                        opacity: 0,
                      }}
                      onClick={() => setShowAvatarModal(true)}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = 0)}
                    >
                      <span className="text-white">Đổi ảnh</span>
                    </div>
                  </div>
                  <p className="mt-3 mp-text-secondary">
                    Nhấn vào ảnh để thay đổi
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
    }
  };

  return (
    <div className="mp-container mp-animated-bg">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />

      <Container className="py-5">
        <Row className="g-4 mp-equal-height-columns">
          {/* Sidebar */}
          <Col md={3}>
            <Card className="mp-card mp-sidebar-card">
              <Card.Body className="p-4">
                <h3 className="mb-4 text-white mp-gradient-heading">
                  Quản lý tài khoản
                </h3>
                <div className="d-flex flex-column gap-2">
                  <Button
                    variant={
                      activeTab === "favorites" ? "warning-user" : "dark-user"
                    }
                    className="text-start d-flex align-items-center mp-btn"
                    style={{
                      backgroundColor:
                        activeTab === "favorites"
                          ? "rgb(235,200,113)"
                          : "#2A2C39",
                      border: "none",
                      color: activeTab === "favorites" ? "#000" : "#fff",
                    }}
                    onClick={() => setActiveTab("favorites")}
                  >
                    <Heart size={18} className="me-2" />
                    Yêu thích
                  </Button>

                  <Button
                    variant={
                      activeTab === "watch-later" ? "warning-user" : "dark-user"
                    }
                    className="text-start d-flex align-items-center mp-btn"
                    style={{
                      backgroundColor:
                        activeTab === "watch-later"
                          ? "rgb(235,200,113)"
                          : "#2A2C39",
                      border: "none",
                      color: activeTab === "watch-later" ? "#000" : "#fff",
                    }}
                    onClick={() => setActiveTab("watch-later")}
                  >
                    <Plus size={18} className="me-2" />
                    Xem sau
                  </Button>

                  <Button
                    variant={
                      activeTab === "continue-watching"
                        ? "warning-user"
                        : "dark-user"
                    }
                    className="text-start d-flex align-items-center mp-btn"
                    style={{
                      backgroundColor:
                        activeTab === "continue-watching"
                          ? "rgb(235,200,113)"
                          : "#2A2C39",
                      border: "none",
                      color:
                        activeTab === "continue-watching" ? "#000" : "#fff",
                    }}
                    onClick={() => setActiveTab("continue-watching")}
                  >
                    <RotateCcw size={18} className="me-2" />
                    Xem tiếp
                  </Button>

                  <Button
                    variant={
                      activeTab === "account" ? "warning-user" : "dark-user"
                    }
                    className="text-start d-flex align-items-center mp-btn"
                    style={{
                      backgroundColor:
                        activeTab === "account"
                          ? "rgb(235,200,113)"
                          : "#2A2C39",
                      border: "none",
                      color: activeTab === "account" ? "#000" : "#fff",
                    }}
                    onClick={() => setActiveTab("account")}
                  >
                    <User size={18} className="me-2" />
                    Tài khoản
                  </Button>

                  <hr className="my-3 bg-secondary" />

                  <Button
                    variant="dark"
                    className="text-start d-flex align-items-center mp-btn"
                    style={{ backgroundColor: "#2A2C39", border: "none" }}
                    onClick={() => handleLogout()}
                  >
                    <LogOut size={18} className="me-2" />
                    Đăng xuất
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col md={9}>{renderTabContent()}</Col>
        </Row>
      </Container>

      {/* Password Change Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        contentClassName="bg-dark text-white border-0"
        className="mp-modal"
      >
        <Modal.Header className="border-0">
          <Modal.Title className="text-center w-100">Đổi mật khẩu</Modal.Title>
          <Button
            variant="link"
            onClick={() => handleCloseModal()}
            className="p-0 ms-auto text-white"
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="mp-form-label">Mật khẩu cũ</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mp-form-control"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mp-form-label">Mật khẩu mới</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setUserForUpdate({
                  ...userForUpdate,
                  password: e.target.value,
                });
              }}
              className="mp-form-control"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="mp-form-label">
              Nhập lại mật khẩu mới
            </Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mp-form-control"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button
            style={{
              backgroundColor: "rgb(235,200,113)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
            }}
            onClick={handlePasswordChange}
            className="mp-btn"
          >
            Đổi mật khẩu
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
            className="mp-btn"
          >
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Avatar Selection Modal */}
      <Modal
        show={showAvatarModal}
        onHide={() => setShowAvatarModal(false)}
        centered
        size="lg"
        contentClassName="bg-dark text-white border-0"
        className="mp-modal"
      >
        <Modal.Header className="border-0">
          <Modal.Title>Đổi ảnh đại diện</Modal.Title>
          <Button
            variant="link"
            onClick={() => setShowAvatarModal(false)}
            className="p-0 ms-auto text-white"
          >
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Row className="g-3">
            {avatarList.map((avatar, index) => (
              <Col xs={4} sm={3} md={2} key={index}>
                <div
                  className={`position-relative rounded overflow-hidden mp-avatar-grid-item ${
                    selectedAvatar === avatar ? "mp-selected" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredAvatar(avatar)}
                  onMouseLeave={() => setHoveredAvatar(null)}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <Image
                    src={avatar || "/placeholder.svg"}
                    alt="Avatar option"
                    fluid
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      transition: "all 0.3s ease",
                      filter:
                        hoveredAvatar === avatar
                          ? "brightness(1.2)"
                          : "brightness(0.9)",
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-end">
          <Button
            style={{
              backgroundColor: "rgb(235,200,113)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
            }}
            onClick={handleAvatarSave}
            className="mp-btn"
          >
            Lưu
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowAvatarModal(false)}
            className="mp-btn"
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
