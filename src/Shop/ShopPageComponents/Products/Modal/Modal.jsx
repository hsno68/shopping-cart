import styles from "./Modal.module.css";

export default function Modal({ product, closeModal }) {
  const {
    title,
    description,
    price,
    images,
    rating,
    reviews,
    brand,
    SKU,
    category,
    tags,
    weight,
    dimensions,
  } = product;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" aria-label={`Close product window for ${title}`} onClick={closeModal}>
          <span aria-hidden="true" className="material-symbols-rounded">
            close
          </span>
        </button>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

/*
  "title": "Essence Mascara Lash Princess",
  "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  "images"
  "price": 9.99,
  "rating": 4.94,
  "reviews"
      rating
      comment
      date
      reviewerName

  brand
  SKU

  category
  tags: ["beauty", "mascara"]
  weight
  dimensions
    width
    height
    depth
*/
