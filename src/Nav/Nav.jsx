import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

export default function Nav({ cart }) {
  return (
    <div className={styles.nav}>
      <Link to="/home" className="link">
        Home
      </Link>
      <Link to="/shop" className="link">
        Shop
      </Link>
      <Link to="/cart" className="link">
        Cart {`(${getCartItemsCount({ cart })})`}
      </Link>
    </div>
  );
}

function getCartItemsCount({ cart }) {
  return Object.values(cart).reduce((total, current) => (total += current.quantity), 0);
}
