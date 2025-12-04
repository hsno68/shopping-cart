import Search from "./ShopPageComponents/Search/Search.jsx";
import Products from "./ShopPageComponents/Products/Products.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={styles.container}>
      <div>This is the shop page.</div>
      <Search />
      <Products />
    </div>
  );
}
