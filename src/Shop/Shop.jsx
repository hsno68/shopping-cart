import Search from "./ShopPageComponents/Search/Search.jsx";
import Filters from "./ShopPageComponents/Filters/Filters.jsx";
import Products from "./ShopPageComponents/Products/Products.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={styles.container}>
      <div>This is the shop page.</div>
      <div className={styles.flexContainer}>
        <Search />
        <Filters />
      </div>
      <Products />
    </div>
  );
}
