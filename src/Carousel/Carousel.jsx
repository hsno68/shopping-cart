import { useState, useEffect, useRef } from "react";
import { API_KEY } from "./../apiKey.js";
import Nav from "./Nav/Nav.jsx";
import Button from "./Button/Button.jsx";
import Slides from "./Slides/Slides.jsx";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const [images, setImages] = useState([]);
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
      if (prevIndex === 0 || prevIndex === images.length - 1) {
        setTransitionEnabled(false);
        return prevIndex === 0 ? images.length - 2 : 1;
      }
      return prevIndex;
    });

    isAnimatingRef.current = false;
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

  const slideCount = images.length - 2;
  const navIndex = images.length > 0 ? (currentIndex - 1 + slideCount) % slideCount : 0;

  return (
    <div className={styles.outerContainer}>
      <Nav slideCount={slideCount} navIndex={navIndex} navigate={navigate} />
      <Button direction="left" navigate={navigate} icon="arrow_back_ios_new" />
      {!images.length ? (
        <p>Loading...</p>
      ) : (
        <Slides
          images={images}
          currentIndex={currentIndex}
          transitionEnabled={transitionEnabled}
          handleTransitionEnd={handleTransitionEnd}
        />
      )}
      <Button direction="right" navigate={navigate} icon="arrow_forward_ios" />
    </div>
  );
}
