import { Link } from "react-router-dom";
import API from "../api/index";
import { useEffect, useState } from "react";
import { FaPlay, FaHeart, FaInfoCircle } from "react-icons/fa"; // import icon từ react-icons
import { Card } from "react-bootstrap";

function Card2({ movie }) {
    const [data, setData] = useState();

    console.log("Card", movie);

    useEffect(() => {
        async function fetchData() {
            const infor = await API.getInforMovies(movie.slug);
            setData(infor);
        }
        fetchData();
    }, []);

    const fixMoreThanOneDecimalPlace = (num) => {
        let decimalPart = num.toString().split(".")[1];
        if (decimalPart && decimalPart.length > 1) return num.toFixed(1);
        return num;
    };

    return (
        <Link to={`/infor/${movie.slug}`} style={{ textDecoration: "none" }}>
            <div
                className="card"
                style={{
                    width: "100%",
                    height: "60%",
                    border: "none",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    borderRadius: "7px",
                    padding: 10,

                }}
            >
                {/* <div className="moreInfor">
                    <div style={{ width: "100%", objectFit: "cover" }}>
                        <img
                            style={{ width: "100%" }}
                            src={API.getLinkImage(movie.poster_url)}
                            alt=""
                        />
                    </div>
                    <div style={{ padding: 20 }}>
                        <p
                            style={{
                                fontSize: "5px",
                                fontWeight: "bold",
                                color: "white",
                                marginBottom: 5,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {movie.name}
                        </p>
                        <p
                            style={{
                                color: "rgb(235, 200, 113)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {movie.originName}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Link to="" style={{ textDecoration: "none" }}>
                                <button
                                    className="btn btn-warning"
                                    style={{
                                        backgroundColor: "rgb(235, 200, 113)",
                                        color: "black",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                    }}
                                >
                                    <FaPlay />
                                    Xem ngay
                                </button>
                            </Link>
                            <button
                                className="btn"
                                style={{
                                    color: "white",
                                    border: "1px solid white",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <FaHeart />
                            </button>
                            <button
                                className="btn"
                                style={{
                                    color: "white",
                                    border: "1px solid white",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <FaInfoCircle />
                            </button>
                        </div>
                        <br />
                        <div style={{ display: "flex", marginBottom: 5 }}>
                            <span className="badge bg-secondary me-2">{movie.year}</span>
                            <span className="badge bg-secondary me-2">{movie.quality}</span>
                            <span className="badge bg-secondary me-2">{movie.lang}</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {movie.category.map((item) => (
                                <span key={item.id} className="badge bg-secondary me-2 mb-2">
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div> */}

                <div className="image-container" style={{ position: "relative" }}>
                    <img
                        src={API.getLinkImage(movie.img)}
                        alt={movie.name}
                        className="card-img-top img-thumb"
                        style={{
                            width: "100%",
                            height: "320px",
                            objectFit: "cover",
                        }}
                    />
                    <div
                        className="imdb"
                        style={{
                            position: "absolute",
                            zIndex: 1,
                            top: 0,
                            right: 0,
                            backgroundColor: "rgb(235, 200, 113)",
                            fontWeight: "bold",
                            padding: "4px",
                            borderRadius: 5,
                        }}
                    >
                        {`IMDb ${fixMoreThanOneDecimalPlace(movie.imdb)}`}
                    </div>
                    {movie.chap && (
                        <div
                            className="chap"
                            style={{
                                position: "absolute",
                                zIndex: 1,
                                bottom: 0,
                                left: 0,
                                color: "white",
                                fontWeight: "bold",
                                padding: "4px",
                                borderRadius: 5,
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            {movie.chap}
                        </div>
                    )}
                </div>

                <div
                    className="card-body "
                    style={{
                        backgroundColor: "rgb(47, 52, 71)",
                        borderRadius: "0px 0px 7px 7px",
                        display: "block",
                        paddingBottom: "0px",
                        height: "70px"

                    }}
                >
                    <h5
                        className="card-title"
                        style={{
                            fontSize: "10px",
                            color: "white",
                        }}
                    >
                        {movie.name}
                    </h5>
                    <p
                        className="card-text"
                        style={{
                            color: "rgb(235, 200, 113)",


                        }}
                    >
                        {movie.originName}
                    </p>
                    <p
                        className="card-text"
                        style={{
                            color: "grey",
                        }}
                    >
                        {movie.time}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Card2;
