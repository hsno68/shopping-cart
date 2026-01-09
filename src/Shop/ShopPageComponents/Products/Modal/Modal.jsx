import { useState, useEffect } from "react";
import Review from "./Review/Review.jsx";
import styles from "./Modal.module.css";

export default function Modal({ product, closeModal }) {
  const { title, description, price, images, rating, reviews, availabilityStatus, sku } = product;

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close product modal"
          className={styles.button}
          onClick={closeModal}
        >
          <span aria-hidden="true" className="material-symbols-rounded">
            close
          </span>
        </button>
        <h2 id="product-modal-title">{title}</h2>
        <p className={styles.sku}>{`SKU: ${sku}`}</p>
        <p className={styles.rating}>
          {`${rating}/5.0`}
          <span aria-hidden="true" className="material-symbols-rounded">
            star_rate
          </span>
          {`(${reviews.length} reviews)`}
        </p>
        <div className={styles.imageSection}>
          <ul className={styles.gallery}>
            {images.map((image, index) => (
              <li
                key={index}
                className={`${styles.galleryImage} ${currentImage === image ? styles.selected : ""}`}
                onClick={() => setCurrentImage(image)}
              >
                <img src={image} alt={title} />
              </li>
            ))}
          </ul>
          <div className={styles.mainImage}>
            <img src={currentImage} alt={title} />
          </div>
        </div>
        <p className={styles.priceTag}>{`$${price}`}</p>
        <h3>About this item</h3>
        <p>{description}</p>
        <p>{availabilityStatus}</p>
        <div>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button type="button">Add to Cart</button>
        </div>
        <h3>Reviews</h3>
        <ul>
          {reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </ul>
      </div>
    </div>
  );
}
