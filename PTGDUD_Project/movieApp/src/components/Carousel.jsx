import { useEffect, useRef, useState } from "react";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import API from "../api/index";

function Carousel() {
  const carouselRef = useRef(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setData(await API.getSuggestMovies(1));
    }
    fetchData();
  }, []);

  return (
    <CCarousel
      controls
      transition="crossfade"
      interval={true}
      indicators
      ref={carouselRef}
    >
      {data.slice(0, 5).map((item, index) => {
        return (
          <CCarouselItem key={index}>
            <CImage
              className="d-block w-100"
              src={API.getLinkImage(item.poster_url)}
              alt="slide 1"
              style={{
                width: "100%",
                height: "90vh",
                objectFit: "fill",
              }}
            />
            <CCarouselCaption className="d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </CCarouselCaption>
          </CCarouselItem>
        );
      })}
    </CCarousel>
  );
}

export default Carousel;
