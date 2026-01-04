import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "./../../../Card/Card.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const { products, setProducts, filters, searchValue, sortValue } = useOutletContext();
  const [searchProducts, setSearchProducts] = useState([]);

  const subCategories = Object.values(filters.subCategories).flat();

  useEffect(() => {
    const cachedSubcategories = Object.keys(products);

    const newSubcategories = subCategories.filter(
      (subCategory) => !cachedSubcategories.includes(subCategory)
    );

    if (!newSubcategories.length) {
      return;
    }

    async function fetchProducts() {
      try {
        const data = await Promise.all(
          newSubcategories.map(async (subCategory) => {
            const response = await fetch(`https://dummyjson.com/products/category/${subCategory}`, {
              mode: "cors",
            });
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const json = await response.json();
            return { subCategory, products: json.products };
          })
        );

        setProducts((prevProducts) => {
          const newListOfProducts = data.reduce((accumulator, current) => {
            const category = current.subCategory;
            const products = current.products;
            accumulator[category] = products;
            return accumulator;
          }, {});

          return { ...prevProducts, ...newListOfProducts };
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [filters.subCategories]);

  useEffect(() => {
    const search = searchValue.trim();

    if (subCategories.length || !search) {
      return;
    }

    const controller = new AbortController();

    const fetchTimeout = setTimeout(() => {
      async function fetchProducts() {
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`,
            {
              mode: "cors",
              signal: controller.signal,
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          setSearchProducts(data.products);
        } catch (error) {
          if (error.name === "AbortError") {
            return;
          }
          console.error("Error fetching products:", error);
        }
      }

      fetchProducts();
    }, 300);

    return () => {
      clearTimeout(fetchTimeout);
      controller.abort();
    };
  }, [searchValue, filters.subCategories]);

  function getListOfProducts() {
    const productsList = subCategories.length
      ? subCategories.flatMap((subCategory) => products[subCategory] ?? [])
      : searchProducts;

    const normalizeSearch = searchValue.trim().toLowerCase();

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
      {subCategories.length === 0 && searchProducts.length === 0 ? (
        <h2>Choose a category or search to view products.</h2>
      ) : (
        <ul className={styles.gridContainer}>
          {getListOfProducts().map(({ id, title, thumbnail, price }) => (
            <Card key={id} title={title} thumbnail={thumbnail} price={price} context={"shop"} />
          ))}
        </ul>
      )}
    </div>
  );
}

/* Example products structure

  products = {
    laptops: [...],
    smartphones: [...]
  }

*/

/* Example fetched data return
[
  {
    subCategory: "laptops",
    products: [...]
  },

  {
    subCategory: "phones",
    products: [...]
  },
]
*/
