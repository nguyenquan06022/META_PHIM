import { useEffect, useState, useContext } from "react";
import Filter from "../components/Filter";
import Search from "../components/Search";
import API from "../api/index";
import Card from "../components/Card";
import PaginationRounded from "../components/PaginationRounded";
import Skeleton from "@mui/material/Skeleton";
import { LoadingContext } from "../global/LoadingContext";
import { useLocation } from "react-router-dom";
function ListMovies({ title }) {
  const location = useLocation();
  const [useWhat, setUseWhat] = useState("");
  const movieType = location.pathname.split("/")[2];
  const [activeItem, setActiveItem] = useState({});
  const [listMovies, setListMovies] = useState([]);
  const [pagiSetting, setPagiSetting] = useState({});
  const [keyWord, setKeyWord] = useState({
    key: "",
    page: 1,
  });
  const [params, setParams] = useState({
    loaiPhim: "",
    theLoai: "",
    quocGia: "",
    nam: "",
    sapXep: "",
    page: 1,
  });
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (movieType == "top_movies") {
        setActiveItem({
          actives: ["tmdb.vote_average", "phim-moi"],
          disables: ["sapXep", "loaiPhim"],
        });
      } else if (movieType == "find_movies") {
        setActiveItem({
          actives: [""],
          disables: [""],
        });
      } else {
        setActiveItem({
          actives: [movieType],
          disables: ["loaiPhim"],
        });
      }
      const list = await API.getTypeMovies(movieType, 1);
      setPagiSetting(list[0].pagination);
      setListMovies(list);
      setLoading(false);
    }
    fetchData();
  }, [title]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const parameter = {
        moviesType: params.loaiPhim,
        page: params.page,
        sortBy: params.sapXep,
        type: params.theLoai,
        nation: params.quocGia,
        year: params.nam,
      };
      const list = await API.searchMovies(parameter);
      if (list && list.length > 0) setPagiSetting(list[0].pagination);
      setListMovies(list);
      setLoading(false);
    }
    fetchData();
  }, [params]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const list = await API.findMovies(keyWord.key, keyWord.page);
      if (list && list.length > 0) {
        setPagiSetting(list[0].pagination);
      }
      setListMovies(list);
      setLoading(false);
    }
    fetchData();
  }, [keyWord]);
  return (
    <div style={{ padding: "10px 25px 0 25px" }}>
      <Filter
        activeItem={activeItem}
        state={{ params, setParams }}
        what={{ useWhat, setUseWhat }}
      />
      {movieType == "find_movies" && (
        <Search
          state={{ keyWord, setKeyWord }}
          what={{ useWhat, setUseWhat }}
        />
      )}
      <br />
      <div>
        <div
          style={{
            flexGrow: 1,
            background:
              "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(247, 161, 11) 130%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            borderBottom: "1px solid white",
          }}
        >
          <h3>{title || "Kết quả tìm kiếm"}</h3>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row g-1 mt-2">
          {loading
            ? Array(24)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: 7,
                      overflow: "hidden",
                      backgroundColor: "transparent",
                    }}
                    className="col-6 col-md-4 col-lg-3"
                  >
                    <div className="skeleton-card">
                      <Skeleton
                        variant="rectangular"
                        sx={{ bgcolor: "rgb(73, 73, 73)" }}
                        animation="wave"
                        style={{ margin: 10, borderRadius: 7 }}
                        className="skeleton-image"
                      />
                      <Skeleton
                        variant="text"
                        className="skeleton-title"
                        sx={{ bgcolor: "rgb(73, 73, 73)" }}
                        animation="wave"
                        style={{ margin: 10 }}
                      />
                      <Skeleton
                        variant="text"
                        className="skeleton-subtitle"
                        sx={{ bgcolor: "rgb(73, 73, 73)" }}
                        animation="wave"
                        style={{ margin: 10 }}
                      />
                    </div>
                  </div>
                ))
            : listMovies.map((item, index) => {
                console.log(item);
                return (
                  <div key={index} className="col-6 col-md-4 col-lg-3">
                    <Card movie={item}></Card>
                  </div>
                );
              })}
        </div>
      </div>
      <br />
      <div>
        <PaginationRounded
          setting={pagiSetting}
          state1={{ params, setParams }}
          what={{ useWhat, setUseWhat }}
          state2={{ keyWord, setKeyWord }}
        ></PaginationRounded>
      </div>
    </div>
  );
}
export default ListMovies;
