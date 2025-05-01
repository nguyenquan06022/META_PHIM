import { ArrowLeft } from "lucide-react"
import classNames from "classnames/bind"

import style from "./blog-hero.module.scss"

import avtDev from "/avatar/avtD.png"
import avtDev2 from "/avatar/me.png"

export default function AboutUs() {
    const cx = classNames.bind(style)
    return (
        <div className={cx("blog-page")}>
            {/* Navigation */}
            <div className={cx("nav-container")}>
                <button className={cx("back-button")}>
                    <ArrowLeft size={24} />
                </button>
            </div>

            {/* Hero Section */}
            <div className={cx("hero-section")}>
                {/* Left Background */}
                <div className={cx("bg-left")}></div>

                {/* Right Background */}
                <div className={cx("bg-right")}></div>

                {/* Center Cards Container */}
                <div className={cx("cards-container")}>
                    <div className={cx("cards-row")}>
                        {/* First Team Member Card */}
                        <div className={cx("member-card")}>
                            <div className={cx("card-body")}>
                                <div className={cx("card-text")}>
                                    <h2 className={cx("card-title")}>
                                        Hi! I Am <br />
                                        Developer
                                    </h2>
                                    <p className={cx("card-subtitle")}>Frontend & UI Specialist</p>
                                </div>
                                <div className={cx("image-container")}>
                                    <div className={cx("image-bg")}></div>
                                    <img src={avtDev} alt="Developer 1" className={cx("profile-image")} />
                                </div>
                            </div>
                        </div>

                        {/* Second Team Member Card */}
                        <div className={cx("member-card")}>
                            <div className={cx("card-body")}>
                                <div className={cx("card-text")}>
                                    <h2 className={cx("card-title")}>
                                        Hello! I Am <br />
                                        Designer
                                    </h2>
                                    <p className={cx("card-subtitle")}>UX & Graphic Designer</p>
                                </div>
                                <div className={cx("image-container")}>
                                    <div className={cx("image-bg")}></div>
                                    <img src={avtDev2} alt="Developer 2" className={cx("profile-image")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className={cx("content-section")}>
                <div className={cx("content-container")}>
                    <p className={cx("content-text")} style={{ color: "white" }}>
                        <strong>QComic</strong> là một sản phẩm nhỏ nhưng khá tâm huyết của Quân, là kho truyện đa dạng và được cập
                        nhật liên tục, mọi dữ liệu truyện tranh thuộc quyền sở hữu của{" "}
                        <a href="#" className={cx("link")}>
                            Otruyen.cc
                        </a>
                        . Hi vọng bạn đọc có những giây phút giải trí vui vẻ tại QComic ^_^.
                    </p>
                </div>
            </div>
        </div>
    )
}