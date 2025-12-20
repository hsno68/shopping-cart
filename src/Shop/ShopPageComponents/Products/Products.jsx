import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "./Card/Card.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const { products, setProducts, filters, searchValue } = useOutletContext();

  const cachedSubcategories = Object.keys(products);
  const subCategories = Object.values(filters.subCategories).flat();

  useEffect(() => {
    const subCategory = subCategories.find(
      (subCategory) => !cachedSubcategories.includes(subCategory)
    );

    if (!subCategory) {
      return;
    }

    async function fetchProducts() {
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${subCategory}`, {
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        setProducts((prevProducts) => ({ ...prevProducts, [subCategory]: data.products }));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [filters.subCategories]);

  function getListOfProducts() {
    const productsList = subCategories.flatMap((subCategory) => products[subCategory] ?? []);
    const normalizeSearch = searchValue.toLowerCase();

    if (normalizeSearch) {
      return productsList.filter((product) => {
        const title = product.title.toLowerCase();
        const tags = product.tags.map((tag) => tag.toLowerCase());
        return title.includes(normalizeSearch) || tags.some((tag) => tag.includes(normalizeSearch));
      });
    }

    return productsList;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      {subCategories.length === 0 ? (
        <h2>Choose a category or search to view products.</h2>
      ) : (
        <ul className={styles.gridContainer}>
          {getListOfProducts().map(({ id, title, thumbnail, price }) => (
            <Card key={id} title={title} thumbnail={thumbnail} price={price} />
          ))}
        </ul>
      )}
    </div>
  );
}
