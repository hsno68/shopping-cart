import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav.jsx";

export default function App() {
  const [carouselImages, setCarouselImages] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [filters, setFilters] = useState({ mainCategories: [], subCategories: {} });

  const [cart, setCart] = useState({});

  function toggleMainCategoryFilter({ mainCategory }) {
    setFilters((prevFilters) => {
      const prevMainCategories = prevFilters.mainCategories;

      if (!prevMainCategories.includes(mainCategory)) {
        return {
          ...prevFilters,
          mainCategories: [...prevMainCategories, mainCategory],
        };
      }

      return {
        ...prevFilters,
        mainCategories: prevMainCategories.filter((category) => category !== mainCategory),
      };
    });
  }

  function toggleSubcategoryFilter({ mainCategory, subCategory }) {
    setFilters((prevFilters) => {
      const prevSubcategories = prevFilters.subCategories;

      if (!Object.hasOwn(prevSubcategories, mainCategory)) {
        return {
          ...prevFilters,
          subCategories: { ...prevSubcategories, [mainCategory]: [subCategory] },
        };
      }

      const listOfSubcategories = prevSubcategories[mainCategory];

      if (!listOfSubcategories.includes(subCategory)) {
        return {
          ...prevFilters,
          subCategories: {
            ...prevSubcategories,
            [mainCategory]: [...listOfSubcategories, subCategory],
          },
        };
      }

      return {
        ...prevFilters,
        subCategories: {
          ...prevSubcategories,
          [mainCategory]: listOfSubcategories.filter((category) => category !== subCategory),
        },
      };
    });
  }

  function clearFilters() {
    setFilters((prevFilters) => ({ ...prevFilters, subCategories: {} }));
  }

  return (
    <div className="app">
      <Nav cart={cart} />
      <Outlet
        context={{
          carouselImages,
          setCarouselImages,
          searchValue,
          setSearchValue,
          sortValue,
          setSortValue,
          categories,
          setCategories,
          products,
          setProducts,
          cart,
          setCart,
          filters,
          setFilters,
          toggleMainCategoryFilter,
          toggleSubcategoryFilter,
          clearFilters,
        }}
      />
    </div>
  );
}

/* Example filters structure

  filters = {
    mainCategories: ["Electronics", "Apparel"],
    subCategories: {
      Electronics: ["laptops", "smartphones"],
      Apparel: ["mens-shirts", "womens-dresses"]
    }

*/
