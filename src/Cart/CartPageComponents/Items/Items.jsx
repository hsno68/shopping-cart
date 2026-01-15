import { useOutletContext, Link } from "react-router-dom";
import { getSubtotal } from "../../../utilities.js";
import Card from "./Card/Card.jsx";
import styles from "./Items.module.css";

export default function Items() {
  const { products, cart } = useOutletContext();

  const isCartEmpty = Object.keys(cart).length === 0;

  return (
    <div className={`${styles.container} ${isCartEmpty ? styles.fullWidth : ""}`}>
      {isCartEmpty ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/shop" className="link">
            Browse products in the Shop
          </Link>{" "}
          to add items.
        </p>
      ) : (
        <>
          <ul>
            {Object.entries(cart).map(([id, quantity]) => {
              const product = products[id];
              const { title, thumbnail, price } = product;

              return (
                <Card
                  key={id}
                  title={title}
                  thumbnail={thumbnail}
                  price={price}
                  quantity={quantity}
                />
              );
            })}
          </ul>
          <p
            className={styles.subtotal}
          >{`Subtotal: $${getSubtotal(cart, products).toFixed(2)}`}</p>
        </>
      )}
    </div>
  );
}
