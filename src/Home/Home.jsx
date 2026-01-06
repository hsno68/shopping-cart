import Header from "./HomePageComponents/Header/Header.jsx";
import Carousel from "./HomePageComponents/Carousel/Carousel.jsx";
import Categories from "./HomePageComponents/Categories/Categories.jsx";
import Highlights from "./HomePageComponents/Highlights/Highlights.jsx";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Carousel />
      <Categories />
      <Highlights />
    </div>
  );
}
