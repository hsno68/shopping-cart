import Search from "./ShopPageComponents/Search/Search.jsx";
import Filters from "./ShopPageComponents/Filters/Filters.jsx";
import Products from "./ShopPageComponents/Products/Products.jsx";
import Categories from "./ShopPageComponents/Categories/Categories.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Search />
        <Filters />
      </div>
      <div className={`${styles.flexContainer} ${styles.content}`}>
        <Categories />
        <Products />
      </div>
    </div>
  );
}
