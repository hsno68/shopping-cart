import { useState, useEffect } from "react";
import Card from "./Card/Card.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=10", {
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      {!products.length ? (
        <p>"Loading..."</p>
      ) : (
        <ul className={styles.gridContainer}>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}
