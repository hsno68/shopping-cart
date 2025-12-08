import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Categories() {
  const { categories, setCategories } = useOutletContext();

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
          const generalizedCategory = groupCategories(category);

          if (!accumulator.hasOwnProperty(generalizedCategory)) {
            accumulator[generalizedCategory] = [];
          }

          accumulator[generalizedCategory].push(category);
          return accumulator;
        }, {});

        setCategories(groupedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return <h1>Test</h1>;
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
