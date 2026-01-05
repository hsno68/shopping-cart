import { useOutletContext } from "react-router-dom";

export default function Tags() {
  const { filters, toggleSubcategoryFilter } = useOutletContext();

  const categories = Object.entries(filters.subCategories);

  return <h1>Test</h1>;
}
