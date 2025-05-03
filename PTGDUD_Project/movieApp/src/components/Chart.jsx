"use client"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Card from "./Card2"
import { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import API from "../api/index"

function CustomChart() {

  const [current, setCurrent] = useState([])
  const [pre, setPre] = useState([])
  const [suggestMovies, setListSuggestMovies] = useState([])


  useEffect(() => {
    async function fetchData() {
      const suggestMovies = await API.getTypeMovies("top_movies", 1);
      setListSuggestMovies(suggestMovies);
    }
    fetchData();
  }, []);


  useEffect(() => {


    axios.get("http://localhost:3000/getSoLuotXemNgay")
      .then((response) => {
        setCurrent(response.data.currentMonth) // không cần map
        setPre(response.data.lastMonth)
      })
  }, [])

  const combinedData = useMemo(() => {
    const maxLength = Math.max(current.length, pre.length)
    return Array.from({ length: maxLength }, (_, i) => ({
      day: i + 1,
      current: current[i] || 0,
      previous: pre[i] || 0,
    }))
  }, [current, pre])


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
          <LineChart data={combinedData}>
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Line
              type="monotone"
              dataKey="current"
              name="Tháng này"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              name="Tháng trước"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 3 }}
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
          <h2 style={{ color: "#ffffff", marginBottom: "5px", textAlign: "left", fontSize: "24px" }}>Top 5 phim được xem nhiều nhất tháng {new Date().getMonth() + 1}</h2>

          <div className="lead-of-month" ref={scrollRef} style={scrollContainerStyle}>

            {suggestMovies.slice(0, 5).map((item, index) => (
              <div key={index} className="item" style={{ minWidth: 180 }}>
                <Card movie={item} />
              </div>
            ))}
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
