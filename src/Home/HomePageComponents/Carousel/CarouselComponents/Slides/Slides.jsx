import styles from "./Slides.module.css";

export default function Slides({ images, animationStyle, handleTransitionEnd }) {
  return (
    <div className={styles.container} style={animationStyle} onTransitionEnd={handleTransitionEnd}>
      {images.map(({ src, alt }, index) => (
        <img key={index} src={src} alt={alt} className={styles.image} />
      ))}
    </div>
  );
}
