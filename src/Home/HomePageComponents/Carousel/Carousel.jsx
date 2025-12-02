import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { API_KEY } from "../../../../apiKey.js";
import Nav from "./CarouselComponents/Nav/Nav.jsx";
import Button from "./CarouselComponents/Button/Button.jsx";
import Slides from "./CarouselComponents/Slides/Slides.jsx";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const { carouselImages, setCarouselImages } = useOutletContext();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isAnimatingRef = useRef(false);

  function navigate({ direction, index }) {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setTransitionEnabled(true);

    if (direction) {
      setCurrentIndex((prevIndex) => prevIndex + (direction === "left" ? -1 : 1));
    } else {
      setCurrentIndex(index + 1);
    }
  }

  function handleTransitionEnd() {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0 || prevIndex === carouselImages.length - 1) {
        setTransitionEnabled(false);
        return prevIndex === 0 ? carouselImages.length - 2 : 1;
      }
      return prevIndex;
    });

    isAnimatingRef.current = false;
  }

  useEffect(() => {
    if (carouselImages.length > 0) {
      return;
    }

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

        setCarouselImages(loopedSources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  const fetchedImages = carouselImages.length > 0;
  const slidesCount = fetchedImages ? carouselImages.length - 2 : 0;
  const navIndex = fetchedImages ? (currentIndex - 1 + slidesCount) % slidesCount : 0;

  return (
    <div className={styles.container}>
      <Nav slidesCount={slidesCount} navIndex={navIndex} navigate={navigate} />
      <Button direction="left" icon="arrow_back_ios_new" navigate={navigate} />
      {!carouselImages.length ? (
        <p>Loading...</p>
      ) : (
        <Slides
          images={carouselImages}
          currentIndex={currentIndex}
          transitionEnabled={transitionEnabled}
          handleTransitionEnd={handleTransitionEnd}
        />
      )}
      <Button direction="right" icon="arrow_forward_ios" navigate={navigate} />
    </div>
  );
}
