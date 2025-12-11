import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Subcategories from "./Subcategories/Subcategories.jsx";
import styles from "./Categories.module.css";

export default function Categories() {
  const { categories, setCategories, filters, toggleMainCategory } = useOutletContext();

  useEffect(() => {
    if (Object.keys(categories).length > 0) {
      return;
    }

    async function fetchCategories() {
      try {
        const response = await fetch("https://dummyjson.com/products/category-list", {
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const categoriesList = await response.json();

        const groupedCategories = categoriesList.reduce((accumulator, category) => {
          const mainCategory = groupCategories(category);

          if (!accumulator.hasOwnProperty(mainCategory)) {
            accumulator[mainCategory] = [];
          }

          accumulator[mainCategory].push(formatCategory(category));
          return accumulator;
        }, {});

        setCategories(groupedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <ul className={styles.container}>
      {Object.entries(categories).map(([mainCategory, subCategories]) => (
        <li key={mainCategory}>
          <h2 onClick={() => toggleMainCategory({ mainCategory })}>{mainCategory}</h2>
          {filters.mainCategories.includes(mainCategory) ? (
            <Subcategories mainCategory={mainCategory} items={subCategories} />
          ) : (
            false
          )}
        </li>
      ))}
    </ul>
  );
}

function groupCategories(category) {
  // Accessories
  if (["mens-watches", "sunglasses", "womens-jewellery", "womens-watches"].includes(category)) {
    return "Accessories";
  }

  // Apparel
  if (
    ["mens-shirts", "mens-shoes", "tops", "womens-bags", "womens-dresses", "womens-shoes"].includes(
      category
    )
  ) {
    return "Apparel";
  }

  // Beauty
  if (["beauty", "fragrances", "skin-care"].includes(category)) {
    return "Beauty";
  }

  // Electronics
  if (["laptops", "mobile-accessories", "smartphones", "tablets"].includes(category)) {
    return "Electronics";
  }

  // Groceries
  if (["groceries"].includes(category)) {
    return "Groceries";
  }

  // Home
  if (["furniture", "home-decoration", "kitchen-accessories"].includes(category)) {
    return "Home";
  }

  // Sports
  if (["motorcycle", "sports-accessories", "vehicle"].includes(category)) {
    return "Sports";
  }

  return "Other";
}

function formatCategory(category) {
  return category
    .split("-")
    .map((string) => {
      let resultString = string[0].toUpperCase() + string.slice(1);
      if (resultString.endsWith("ens")) {
        resultString = `${resultString.substring(0, resultString.length - 1)}'s`;
      }
      return resultString;
    })
    .join(" ");
}
