"use client"

import { useState } from "react"
import { Card, Container, Row, Col } from "react-bootstrap"
import { FaUser, FaEye, FaUsers, FaFilm } from "react-icons/fa"

import axios from "axios"

function OverviewCard() {
    const [overview, setOverview] = useState(null)

    const [countUser, setCountUser] = useState(0)
    const [category, setCategory] = useState()
    const [mean, setMean] = useState([])
    const [view, setView] = useState(0)

    const url = [
        "http://localhost:3000/getTheLoaiYeuThich",
        "http://localhost:3000/getSoLuongTaiKhoan",
        "http://localhost:3000/overview/mean"
    ]

    

    // Custom styles for dark theme
    const containerStyle = {
        backgroundColor: "#14181b",
        padding: "1.5rem",
    }

    const cardStyle = {
        backgroundColor: "#1e2329",
        borderRadius: "0.75rem",
        border: "none",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }

    const titleStyle = {
        color: "#9ca3af",
        fontWeight: 500,
        marginBottom: "0.5rem",
    }

    const valueStyle = {
        color: "white",
        fontSize: "1.875rem",
        fontWeight: 700,
    }

    const changeStyle = {
        color: "#10b981",
        fontSize: "0.875rem",
    }

    const iconContainerStyle = {
        position: "absolute",
        top: "1rem",
        right: "1rem",
        fontSize: "1.5rem",
    }

    return (
        <div style={containerStyle}>
            <Container fluid>
                <Row>
                    {/* Card 1 - Thời gian xem trung bình */}
                    <Col md={3} className="mb-3">
                        <Card style={cardStyle}>
                            <Card.Body className="position-relative">
                                <div style={{ ...iconContainerStyle, color: "#6d28d9" }}>
                                    <FaUser />
                                </div>
                                <h5 style={titleStyle}>Thời gian xem trung bình</h5>
                                <p style={valueStyle}>{overview?.turnover ? `$${overview.turnover.toLocaleString()}` : ""}</p>
                                <p style={changeStyle}>+ {overview?.turnoverChange || "0"}% period change</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 2 - Số lượt xem phim */}
                    <Col md={3} className="mb-3">
                        <Card style={cardStyle}>
                            <Card.Body className="position-relative">
                                <div style={{ ...iconContainerStyle, color: "#8b5cf6" }}>
                                    <FaEye />
                                </div>
                                <h5 style={titleStyle}>Số lượt xem phim</h5>
                                <p style={valueStyle}>{overview?.profit ? `$${overview.profit.toLocaleString()}` : "    "}</p>
                                <p style={changeStyle}>+ {overview?.profitChange || "0"}% period change</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 3 - Người dùng mới */}
                    <Col md={3} className="mb-3">
                        <Card style={cardStyle}>
                            <Card.Body className="position-relative">
                                <div style={{ ...iconContainerStyle, color: "#ec4899" }}>
                                    <FaUsers />
                                </div>
                                <h5 style={titleStyle}>Người dùng mới</h5>
                                <p style={valueStyle}>{overview?.newCustomer || "0"}</p>
                                <p style={changeStyle}>+ {overview?.newCustomerChange || "0"}% period change</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Card 4 - Thể loại yêu thích */}
                    <Col md={3} className="mb-3">
                        <Card style={cardStyle}>
                            <Card.Body className="position-relative">
                                <div style={{ ...iconContainerStyle, color: "#3b82f6" }}>
                                    <FaFilm />
                                </div>
                                <h5 style={titleStyle}>Thể loại yêu thích</h5>
                                <p style={valueStyle}>{overview?.favoriteGenre || "Action"}</p>
                                <p style={changeStyle}>+ {overview?.genreChange || "0"}% period change</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OverviewCard
