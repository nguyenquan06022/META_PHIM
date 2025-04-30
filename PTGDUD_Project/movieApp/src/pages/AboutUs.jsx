import { ArrowLeft } from "lucide-react"
import "./blog-hero.css"
import avtDev from "/avatar/avtD.png"
import avtDev2 from "/avatar/me.png"

export default function AboutUs() {
    return (
        <div className="blog-page">
            {/* Navigation */}
            <div className="nav-container">
                <button className="back-button">
                    <ArrowLeft size={24} />
                </button>
            </div>

            {/* Hero Section */}
            <div className="hero-section">
                {/* Left Background */}
                <div className="bg-left"></div>

                {/* Right Background */}
                <div className="bg-right"></div>

                {/* Center Cards Container */}
                <div className="cards-container">
                    <div className="cards-row">
                        {/* First Team Member Card */}
                        <div className="member-card">
                            <div className="card-body">
                                <div className="card-text">
                                    <h2 className="card-title">
                                        Hi! I Am <br />
                                        Developer
                                    </h2>
                                    <p className="card-subtitle">Frontend & UI Specialist</p>
                                </div>
                                <div className="image-container">
                                    <div className="image-bg "></div>
                                    <img src={avtDev} alt="Developer 1" className="profile-image" />
                                </div>
                            </div>
                        </div>

                        {/* Second Team Member Card */}
                        <div className="member-card">
                            <div className="card-body">
                                <div className="card-text">
                                    <h2 className="card-title">
                                        Hello! I Am <br />
                                        Designer
                                    </h2>
                                    <p className="card-subtitle">UX & Graphic Designer</p>
                                </div>
                                <div className="image-container">
                                    <div className="image-bg"></div>
                                    <img src={avtDev2} alt="Developer 2" className="profile-image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="content-section ">
                <div className="content-container">
                    <p className="content-text" style={{color: "white"}}>
                        <strong >QComic</strong> là một sản phẩm nhỏ nhưng khá tâm huyết của Quân, là kho truyện đa dạng và được cập
                        nhật liên tục, mọi dữ liệu truyện tranh thuộc quyền sở hữu của{" "}
                        <a href="#" className="link">
                            Otruyen.cc
                        </a>
                        . Hi vọng bạn đọc có những giây phút giải trí vui vẻ tại QComic ^_^.
                    </p>
                </div>
            </div>
        </div>
    )
}
