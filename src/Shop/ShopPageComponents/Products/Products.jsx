import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "./Card/Card.jsx";
import Modal from "./Modal/Modal.jsx";
import styles from "./Products.module.css";

export default function Products() {
  const { products, setProducts, filters, searchValue, sortValue } = useOutletContext();
  const [activeProduct, setActiveProduct] = useState(null);
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

            const productsMap = products.reduce((map, current) => {
              map[current.id] = current;
              return map;
            }, {});

            accumulator[category] = productsMap;
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
      setSearchProducts([]);
      return;
    }

    const controller = new AbortController();

    const fetchTimeout = setTimeout(() => {
      async function fetchProducts() {
        try {
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=0`,
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
    let productsList = subCategories.length
      ? subCategories.flatMap((subCategory) => Object.values(products[subCategory] || {}))
      : searchProducts;

    const normalizeSearch = searchValue.trim().toLowerCase();

    if (sortValue) {
      productsList = sortProducts(productsList);
    }

    if (normalizeSearch && subCategories.length) {
      return productsList.filter((product) => {
        const title = product.title.toLowerCase();
        const tags = product.tags.map((tag) => tag.toLowerCase());
        return title.includes(normalizeSearch) || tags.some((tag) => tag.includes(normalizeSearch));
      });
    }

    return productsList;
  }

  function sortProducts(products) {
    const comparators = {
      ratingDesc: (a, b) => b.rating - a.rating,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      titleAsc: (a, b) => a.title.localeCompare(b.title),
      titleDesc: (a, b) => b.title.localeCompare(a.title),
    };

    const comparator = comparators[sortValue];

    if (!comparator) {
      return products;
    }

    return products.sort(comparator);
  }

  return (
    <div className={styles.container}>
      {subCategories.length === 0 && searchProducts.length === 0 ? (
        <h2>Choose a category or search to view products.</h2>
      ) : (
        <ul className={styles.gridContainer}>
          {getListOfProducts().map((product) => {
            const { id, title, thumbnail, price } = product;

            return (
              <Card
                key={id}
                title={title}
                thumbnail={thumbnail}
                price={price}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProduct(product);
                }}
              />
            );
          })}
        </ul>
      )}
      {activeProduct && <Modal product={activeProduct} closeModal={() => setActiveProduct(null)} />}
    </div>
  );
}

/* Example products structure

  products = {
    laptops: {
      1: { id: 1, title: "Laptop A", price: 999, ... },
      2: { id: 2, title: "Laptop B", price: 1299, ... },
      3: { id: 3, title: "Laptop C", price: 899, ... },
    },
    smartphones: {
      7: { id: 7, title: "Phone X", price: 699, ... },
      8: { id: 8, title: "Phone Y", price: 799, ... },
      9: { id: 9, title: "Phone Z", price: 599, ... },
    },
    tablets: {
      12: { id: 12, title: "Tablet Alpha", price: 499, ... },
      13: { id: 13, title: "Tablet Beta", price: 599, ... },
    }
  };

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
