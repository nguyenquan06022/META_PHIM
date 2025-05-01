import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

import Card from "./Card2";
import { useRef } from "react";

const data = [
    { name: "Tháng 1", lượtXem: 400 },
    { name: "Tháng 2", lượtXem: 700 },
    { name: "Tháng 3", lượtXem: 300 },
];

function CustomChart() {
    const scrollRef = useRef(null);

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
            { id: "620a2238e0fc277084dfd291", name: "Tâm Lý", slug: "tam-ly" }
        ],
        poster_url: "thinh-quan-poster.jpg",
        quality: "HD",
        pagination: {
            totalItems: 29174,
            totalItemsPerPage: 24,
            currentPage: 1,
            pageRanges: 5
        }
    };

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 220;

        if (container) {
            if (direction === "left") {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <div className="wrapper-container d-flex py-3" style={{ borderRadius: "10px" }}>
            {/* BIỂU ĐỒ */}
            <div className="wrapper me-5" style={{ border: "1px solid #ccc", height: "350px", borderRadius: "10px", padding: "20px", width: "60%" }}>
                <ResponsiveContainer width="80%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line
                            type="monotone"
                            dataKey="lượtXem"
                            stroke="#8884d8"
                            strokeWidth={4}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* DANH SÁCH PHIM VỚI NÚT CUỘN */}
            <div style={{ width: "40%", position: "relative" }}>
                {/* Nút trái */}
                <button
                    onClick={() => scroll("left")}
                    style={{
                        position: "absolute", left: 0, top: "40%",
                        zIndex: 1, background: "#fff", border: "1px solid #ccc", borderRadius: "50%", width: 30, height: 30
                    }}
                >◀</button>

                {/* Khung chứa các Card */}
                <div className="" style={{border: "1px solid #ccc",height : "350px", borderRadius: "10px", padding: "20px", width: "100%"}}>
                    <h2>Lead of month</h2>

                    <div
                        className="lead-of-month"
                        ref={scrollRef}
                        style={{
                            overflowX: "auto",
                            display: "flex",
                            gap: "10px",
                            padding: "10px",
                            scrollBehavior: "smooth",
                            scrollbarWidth: "none",        // Firefox
                            msOverflowStyle: "none",
                        }}
                    >
                        <div className="item" style={{ minWidth: 200 }}><Card movie={o} /></div>
                        <div className="item" style={{ minWidth: 200 }}><Card movie={o} /></div>
                        <div className="item" style={{ minWidth: 200 }}><Card movie={o} /></div>
                        <div className="item" style={{ minWidth: 200 }}><Card movie={o} /></div>
                    </div>
                </div>

                {/* Nút phải */}
                <button
                    onClick={() => scroll("right")}
                    style={{
                        position: "absolute", right: 0, top: "40%",
                        zIndex: 1, background: "#fff", border: "1px solid #ccc", borderRadius: "50%", width: 30, height: 30
                    }}
                >▶</button>
            </div>
        </div>
    );
}

export default CustomChart;
