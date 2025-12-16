import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "./Card/Card.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const { products, setProducts, filters } = useOutletContext();

  const { subCategories } = filters;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const responses = await Promise.all(
          Object.values(subCategories)
            .flat()
            .map((subCategory) =>
              fetch(`https://dummyjson.com/products/category/${subCategory}`, { mode: "cors" })
            )
        );

        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        });

        const data = await Promise.all(responses.map((response) => response.json()));
        const products = data.flatMap((d) => d.products);

        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [subCategories]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      {products.length > 0 ? (
        <ul className={styles.gridContainer}>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <h2>Search or select a category to begin.</h2>
      )}
    </div>
  );
}
