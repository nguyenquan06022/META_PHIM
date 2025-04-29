import { useEffect, useRef, useState, useContext } from "react";
import { LoadingContext } from "../global/LoadingContext";
import Skeleton from "@mui/material/Skeleton";

function VideoDemo({ videoList }) {
  const playerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const { loading } = useContext(LoadingContext);

  const playNextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const initializePlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    playerRef.current = new window.YT.Player("player", {
      videoId: videoList[currentIndex]?.videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        playsinline: 1,
        fs: 1,
      },
      events: {
        onReady: (event) => {
          if (isMuted) {
            event.target.mute();
          } else {
            event.target.unMute();
          }
          event.target.playVideo();
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.ENDED) {
            playNextVideo();
          }
        },
        onError: playNextVideo,
      },
    });
  };

  useEffect(() => {
    if (!videoList || videoList.length === 0) return;

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.onload = () => {
        window.onYouTubeIframeAPIReady = initializePlayer;
      };
      document.body.appendChild(tag);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoList, currentIndex]);

  useEffect(() => {
    if (playerRef.current && videoList.length > 0) {
      if (typeof playerRef.current.loadVideoById === "function") {
        playerRef.current.loadVideoById(videoList[currentIndex]?.videoId);
      }
      if (typeof playerRef.current.playVideo === "function") {
        playerRef.current.playVideo();
      }
    }
  }, [currentIndex, videoList]);

  const toggleMute = () => {
    if (
      playerRef.current &&
      typeof playerRef.current.mute === "function" &&
      typeof playerRef.current.unMute === "function"
    ) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted((prev) => !prev);
    }
  };

  return (
    <div
      className="video-container"
      style={{ position: "relative", height: "80vh" }}
    >
      {loading ? (
        <Skeleton
          sx={{ bgcolor: "rgb(73, 73, 73)" }}
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
      ) : (
        <div className="videoDemoContainer">
          <div id="player" style={{ width: "100%", height: "100%" }}></div>
        </div>
      )}
      <button
        className="mute-btn btn btn-secondary"
        onClick={toggleMute}
        style={{
          padding: 10,
          fontSize: 20,
          position: "absolute",
          left: 30,
          bottom: 30,
        }}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}

export default VideoDemo;
