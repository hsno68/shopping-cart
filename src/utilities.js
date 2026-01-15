export function formatCategory(category) {
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

export function getSubtotal(cart, products) {
  return Object.entries(cart).reduce((accumulator, [id, quantity]) => {
    const product = products[id];
    const { price } = product;

    return accumulator + price * quantity;
  }, 0);
}

export function formatDate(date) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-US", {
    weekday: "short", // Mon
    month: "short", // May
    day: "2-digit", // 23
    year: "numeric", // 2024
  });
}
