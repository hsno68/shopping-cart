import styles from "./Slides.module.css";

export default function Slides({ images, currentIndex, transitionEnabled, handleTransitionEnd }) {
  const animationStyle = {
    transform: `translateX(-${currentIndex * 100}%)`,
    transition: transitionEnabled ? "transform 0.3s ease-in-out" : "none",
  };

  return (
    <div className={styles.container} style={animationStyle} onTransitionEnd={handleTransitionEnd}>
      {images.map(({ src, alt }, index) => (
        <img key={index} src={src} alt={alt} />
      ))}
    </div>
  );
}
