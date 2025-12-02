import Header from "./HomePageComponents/Header/Header.jsx";
import Carousel from "./HomePageComponents/Carousel/Carousel.jsx";
import Categories from "./HomePageComponents/Categories/Categories.jsx";
import Products from "./HomePageComponents/Products/Products.jsx";
import layout from "./Home.module.css";

export default function Home() {
  return (
    <div className={layout.container}>
      <Header />
      <Carousel />
      <Categories />
      <Products />
    </div>
  );
}
