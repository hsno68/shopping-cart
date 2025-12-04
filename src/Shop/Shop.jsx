import Products from "./ShopPageComponents/Products/Products.jsx";
import layout from "./Shop.module.css";

export default function Shop() {
  return (
    <div className={layout.container}>
      <div>This is the shop page.</div>
      <Products />
    </div>
  );
}
