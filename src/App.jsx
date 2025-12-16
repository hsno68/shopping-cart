import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav.jsx";

export default function App() {
  const [carouselImages, setCarouselImages] = useState([]);

  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ mainCategories: [], subCategories: {} });

  const [cartItems, setCartItems] = useState([]);

  function toggleMainCategoryFilter({ mainCategory }) {
    setFilters((prevFilters) => {
      const prevMainCategories = prevFilters.mainCategories;
      let newListofMainCategories = [];

      if (!prevMainCategories.includes(mainCategory)) {
        newListofMainCategories = [...prevMainCategories, mainCategory];
      } else {
        newListofMainCategories = prevMainCategories.filter(
          (category) => category !== mainCategory
        );
      }

      return { ...prevFilters, mainCategories: newListofMainCategories };
    });
  }

  function toggleSubcategoryFilter({ mainCategory, subCategory }) {
    setFilters((prevFilters) => {
      const prevSubcategories = prevFilters.subCategories;

      if (!prevSubcategories.hasOwnProperty(mainCategory)) {
        return {
          ...prevFilters,
          subCategories: { ...prevSubcategories, [mainCategory]: [subCategory] },
        };
      }

      const listOfSubcategories = prevSubcategories[mainCategory];
      let newListOfSubcategories = [];

      if (listOfSubcategories.includes(subCategory)) {
        newListOfSubcategories = listOfSubcategories.filter((category) => category !== subCategory);
      } else {
        newListOfSubcategories = [...listOfSubcategories, subCategory];
      }

      return {
        ...prevFilters,
        subCategories: { ...prevSubcategories, [mainCategory]: newListOfSubcategories },
      };
    });
  }

  function clearFilters() {
    setFilters((prevFilters) => ({ ...prevFilters, subCategories: [] }));
  }

  return (
    <div className="app">
      <Nav />
      <Outlet
        context={{
          carouselImages,
          setCarouselImages,
          categories,
          setCategories,
          products,
          setProducts,
          cartItems,
          setCartItems,
          filters,
          toggleMainCategoryFilter,
          toggleSubcategoryFilter,
          clearFilters,
        }}
      />
    </div>
  );
}
