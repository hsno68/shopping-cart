import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "./../../../Card/Card.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const { featuredProducts, setFeaturedProducts } = useOutletContext();

  const urls = [
    "https://dummyjson.com/products/category/smartphones?limit=1",
    "https://dummyjson.com/products/category/womens-bags?limit=1",
    "https://dummyjson.com/products/category/furniture?limit=1",
    "https://dummyjson.com/products/category/fragrances?limit=1",
  ];

  useEffect(() => {
    if (featuredProducts.length) {
      return;
    }

    async function fetchProducts() {
      try {
        const data = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url, { mode: "cors" });
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
          })
        );

        const products = data.map((entry) => entry.products[0]);

        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Featured Products</h2>
      <ul className={styles.gridContainer}>
        {featuredProducts.map(({ title, thumbnail, price }) => (
          <Card key={title} title={title} thumbnail={thumbnail} price={price} context={"home"} />
        ))}
      </ul>
    </div>
  );
}
