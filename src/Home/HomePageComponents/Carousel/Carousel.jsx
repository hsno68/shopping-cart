import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { API_KEY } from "../../../../apiKey.js";
import Nav from "./CarouselComponents/Nav/Nav.jsx";
import Button from "./CarouselComponents/Button/Button.jsx";
import Slides from "./CarouselComponents/Slides/Slides.jsx";
import styles from "./Carousel.module.css";

export default function Carousel() {
  const { carouselImages, setCarouselImages } = useOutletContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isAnimatingRef = useRef(false);

  function navigate({ direction, index }) {
    if (isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setTransitionEnabled(true);

    if (direction) {
      setCurrentIndex((prevIndex) => prevIndex + (direction === "left" ? -1 : 1));
    } else {
      setCurrentIndex(index);
    }
  }

  function handleTransitionEnd() {
    setCurrentIndex((prevIndex) => {
      const nextIndex = getIndex({ index: prevIndex, images: carouselImages });

      if (prevIndex !== nextIndex) {
        setTransitionEnabled(false);
      }

      return nextIndex;
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

        setCarouselImages(sources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className={styles.container}>
      <Nav
        carouselImages={carouselImages}
        navIndex={getIndex({ index: currentIndex, images: carouselImages })}
        navigate={navigate}
      />
      <Button direction="left" icon="arrow_back_ios_new" navigate={navigate} />
      {carouselImages.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <Slides
          images={createLoopedCarousel(carouselImages)}
          animationStyle={createAnimationStyle({
            index: currentIndex,
            canTransition: transitionEnabled,
          })}
          handleTransitionEnd={handleTransitionEnd}
        />
      )}
      <Button direction="right" icon="arrow_forward_ios" navigate={navigate} />
    </div>
  );
}

function getIndex({ index, images }) {
  if (index === -1) {
    return images.length - 1;
  }

  if (index === images.length) {
    return 0;
  }

  return index;
}

function createLoopedCarousel(images) {
  if (images.length === 0) {
    return [];
  }

  return [images[images.length - 1], ...images, images[0]];
}

function createAnimationStyle({ index, canTransition }) {
  const offset = index + 1;
  const transition = canTransition ? "transform 0.3s ease-in-out" : "none";

  return {
    transform: `translateX(-${offset * 100}%)`,
    transition: transition,
  };
}
