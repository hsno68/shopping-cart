import Search from "./ShopPageComponents/Search/Search.jsx";
import Categories from "./ShopPageComponents/Categories/Categories.jsx";
import Products from "./ShopPageComponents/Products/Products.jsx";
import Tags from "./ShopPageComponents/Tags/Tags.jsx";
import Sort from "./ShopPageComponents/Sort/Sort.jsx";
import styles from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={styles.container}>
      <Search />
      <div className={styles.gridContainer}>
        <Categories />
        <div className={styles.flexContainer}>
          <h1>Products</h1>
          <Sort />
        </div>
        <Tags />
        <Products />
      </div>
    </div>
  );
}
