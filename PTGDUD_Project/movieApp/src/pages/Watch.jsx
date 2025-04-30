import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import ListEp from "../components/ListEp";
import FbComment from "../components/FbComment";
import { useLocation } from "react-router-dom";
import API from "../api/index";
function Watch() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const findLink = (serverNumber, episodeName, servers) => {
    const server = servers.find((s) => {
      const match = s.server_name.match(/#(\d+)/);
      return match && match[1] === String(serverNumber);
    });

    if (!server) {
      console.log("Không tìm thấy server phù hợp.");
      return null;
    }
    const episode = server.server_data.find(
      (e) => e.name.toLowerCase() === episodeName.toLowerCase()
    );

    if (!episode) {
      console.log("Không tìm thấy tập phù hợp.");
      return null;
    }
    return episode.link_embed;
  };

  const [movie, setMovie] = useState();
  const [slug, setSlug] = useState();
  const [ep, setEp] = useState();
  const [server, setSever] = useState();
  const [linkVideo, setLinkVideo] = useState();
  const query = useQuery();
  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await API.getInforMovies(location.pathname.split("/")[2]);
        setEp(query.get("ep"));
        setSever(query.get("server"));
        setSlug(location.pathname.split("/")[2]);
        setMovie(data);
        setLinkVideo(
          findLink(query.get("server"), query.get("ep"), data.episodes)
        );
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [location]);
  if (!linkVideo) {
    return <h1>Loading...</h1>;
  }
  return (
    <div style={{ backgroundColor: "rgb(25, 28, 36)" }}>
      <div className="video-container" style={{ width: "100%" }}>
        <VideoPlayer width={"100%"} height={"100%"} link={linkVideo} />
      </div>
      <div style={{ padding: "0px 25px" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <button className="btn btn-secondary btn-hover">
            {" Chuyển tập : "} {"off"}
          </button>
          <button className="btn btn-secondary btn-hover">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M3 12c0 1.654 1.346 3 3 3 .794 0 1.512-.315 2.049-.82l5.991 3.424c-.018.13-.04.26-.04.396 0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3c-.794 0-1.512.315-2.049.82L8.96 12.397c.018-.131.04-.261.04-.397s-.022-.266-.04-.397l5.991-3.423c.537.505 1.255.82 2.049.82 1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3c0 .136.022.266.04.397L8.049 9.82A2.982 2.982 0 0 0 6 9c-1.654 0-3 1.346-3 3z"></path>
            </svg>
            {" Chia sẻ"}
          </button>
          <button className="btn btn-secondary btn-hover">
            <a href="#comments" style={{ all: "unset" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20 1.999H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2v-12c0-1.103-.897-2-2-2zm-6 11H7v-2h7v2zm3-4H7v-2h10v2z"></path>
              </svg>
              {" Bình luận"}
            </a>
          </button>
        </div>
        <br />
        <div className="row">
          <div className="col-md-5 col-12">
            <div className="row">
              <div className="col-4">
                <img src={movie.thumb_url} alt="" style={{ width: "100%" }} />
              </div>
              <div className="col-8">
                <h5 className="card-title" style={{ color: "white" }}>
                  {movie.name}
                </h5>
                <p
                  className="card-text"
                  style={{ color: "rgb(235, 200, 113)" }}
                >
                  {movie.origin_name}
                </p>
                <div style={{ display: "flex", marginBottom: 5 }}>
                  <span className="badge bg-secondary me-2">{movie.year}</span>
                  <span className="badge bg-secondary me-2">
                    {movie.quality}
                  </span>
                  <span className="badge bg-secondary me-2">{movie.lang}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {movie.category.map((item) => (
                    <span
                      key={item.id}
                      className="badge bg-secondary me-2 mb-2"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-12">
            <ListEp
              curEp={movie.episode_current}
              eps={movie.episodes}
              activeItem={ep}
            />
          </div>
          <div className="col-12">
            <div id="comments">
              <div
                style={{
                  padding: 10,
                  color: "rgb(235, 200, 113)",
                }}
              >
                <h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgb(235, 200, 113)" }}
                  >
                    <path d="M20 1.999H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2v-12c0-1.103-.897-2-2-2zm-6 11H7v-2h7v2zm3-4H7v-2h10v2z"></path>
                  </svg>
                  {" Bình luận"}
                </h3>
              </div>
              <div
                style={{
                  padding: 10,
                }}
              >
                <FbComment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Watch;
