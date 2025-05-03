"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Card from "./Card2"
import { useRef } from "react"

const data = [
  { name: "Tháng 1", lượtXem: 400 },
  { name: "Tháng 2", lượtXem: 700 },
  { name: "Tháng 3", lượtXem: 300 },
]

function CustomChart() {
  const scrollRef = useRef(null)

  const o = {
    imdb: 10,
    chap: "Hoàn Tất (36/36)",
    img: "thinh-quan-thumb.jpg",
    name: "Thỉnh Quân",
    slug: "thinh-quan",
    time: "5 ngày trước",
    originName: "Thousand Years For You",
    lang: "Vietsub",
    year: 2022,
    category: [
      { id: "620a222fe0fc277084dfd23d", name: "Cổ Trang", slug: "co-trang" },
      { id: "620a2238e0fc277084dfd291", name: "Tâm Lý", slug: "tam-ly" },
    ],
    poster_url: "thinh-quan-poster.jpg",
    quality: "HD",
    pagination: {
      totalItems: 29174,
      totalItemsPerPage: 24,
      currentPage: 1,
      pageRanges: 5,
    },
  }

  const scroll = (direction) => {
    const container = scrollRef.current
    const scrollAmount = 220

    if (container) {
      if (direction === "left") {
        container.scrollLeft -= scrollAmount
      } else {
        container.scrollLeft += scrollAmount
      }
    }
  }

  // Custom styles for dark theme
  const containerStyle = {
    backgroundColor: "#14181b",
    borderRadius: "10px",
  }

  const chartContainerStyle = {
    border: "1px solid #374151",
    height: "350px",
    borderRadius: "10px",
    padding: "20px",
    width: "60%",
    backgroundColor: "#1e2329",
    color: "#e2e8f0",
  }

  // Card container style - exact match to the image
  const cardsContainerStyle = {
    border: "none",
    height: "350px",
    borderRadius: "10px",
    padding: "20px",
    width: "100%",
    backgroundColor: "#1e2330",
    color: "#e2e8f0",
  }

  // Scroll button style - circular dark buttons
  const scrollButtonStyle = {
    position: "absolute",
    top: "40%",
    zIndex: 1,
    background: "#1e2330",
    border: "1px solid #4b5563",
    borderRadius: "50%",
    width: 36,
    height: 36,
    color: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "14px",
  }

  const scrollContainerStyle = {
    overflowX: "auto",
    display: "flex",
    padding: "10px 0",
    scrollBehavior: "smooth",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none",
  }

  // Custom tooltip style
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#2d3748",
            padding: "10px",
            border: "1px solid #4b5563",
            borderRadius: "5px",
            color: "#e2e8f0",
          }}
        >
          <p>{`${label} : ${payload[0].value}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="wrapper-container d-flex py-3" style={containerStyle}>
      {/* BIỂU ĐỒ */}
      <div className="wrapper me-5" style={chartContainerStyle}>
        <h4 style={{ color: "#e2e8f0", marginBottom: "20px" }}>Lượt xem theo tháng</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Line
              type="monotone"
              dataKey="lượtXem"
              stroke="#8b5cf6"
              strokeWidth={4}
              dot={{ r: 4, fill: "#8b5cf6" }}
              activeDot={{ r: 6, fill: "#8b5cf6" }}
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DANH SÁCH PHIM VỚI NÚT CUỘN */}
      <div style={{ width: "40%", position: "relative" }}>
        {/* Nút trái */}
        <button onClick={() => scroll("left")} style={{ ...scrollButtonStyle, left: 0 }}>
          ◀
        </button>

        {/* Khung chứa các Card */}
        <div style={cardsContainerStyle}>
          <h2 style={{ color: "#ffffff", marginBottom: "20px", textAlign: "left", fontSize: "24px" }}>Lead of month</h2>

          <div className="lead-of-month" ref={scrollRef} style={scrollContainerStyle}>
            <div className="item" style={{ minWidth: 180 }}>
              <Card movie={o} />
            </div>
            <div className="item" style={{ minWidth: 180 }}>
              <Card movie={o} />
            </div>
            <div className="item" style={{ minWidth: 180 }}>
              <Card movie={o} />
            </div>
            <div className="item" style={{ minWidth: 180 }}>
              <Card movie={o} />
            </div>
          </div>
        </div>

        {/* Nút phải */}
        <button onClick={() => scroll("right")} style={{ ...scrollButtonStyle, right: 0 }}>
          ▶
        </button>
      </div>
    </div>
  )
}

export default CustomChart
