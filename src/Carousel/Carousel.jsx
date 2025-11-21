import { useState, useEffect, useRef } from "react";
import { API_KEY } from "./../apiKey.js";
import CarouselButton from "./CarouselButton/CarouselButton.jsx";
import CarouselSlides from "./CarouselSlides/CarouselSlides.jsx";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  function navigate(direction) {
    const delta = direction === "left" ? -1 : 1;
    setTransitionEnabled(true);
    setCurrentIndex((prevIndex) => prevIndex + delta);
  }

  function handleTransitionEnd() {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0 || prevIndex === images.length - 1) {
        setTransitionEnabled(false);
        return prevIndex === 0 ? images.length - 2 : 1;
      }
      return prevIndex;
    });
  }

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("https://api.pexels.com/v1/collections/mmhrphx", {
          headers: {
            authorization: API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        const sources = data.media.map((media) => ({
          src: media.src.landscape,
          alt: media.alt,
        }));
        const first = sources[0];
        const last = sources[sources.length - 1];
        const loopedSources = [last, ...sources, first];

        setImages(loopedSources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <>
      <div className={styles.outerContainer}>
        <CarouselButton direction="left" navigate={navigate} icon="arrow_back_ios_new" />
        {!images.length ? (
          <div>Loading...</div>
        ) : (
          <CarouselSlides
            images={images}
            currentIndex={currentIndex}
            transitionEnabled={transitionEnabled}
            handleTransitionEnd={handleTransitionEnd}
          />
        )}
        <CarouselButton direction="right" navigate={navigate} icon="arrow_forward_ios" />
      </div>
      {currentIndex}
    </>
  );
}
