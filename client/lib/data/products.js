/**
 * Static product data for the Product Details page.
 *
 * This is a placeholder data source for the frontend phase. When the
 * Express + MySQL API is ready, replace the bodies of getProductById /
 * getRelatedProducts with calls to GET /api/products/:id — ProductDetails,
 * QuantitySelector and ProductCard don't know or care where the data
 * comes from, so no presentation component needs to change.
 *
 * Keys match the /product/[id] route param (e.g. /product/tomatoes).
 */
export const PRODUCTS = {
  tomatoes: {
    id: "tomatoes",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    categoryHref: "/categories#vegetables",
    unit: "1 kg",
    price: 40,
    image: "/images/products/tomatoes.png",
    description:
      "Fresh, everyday tomatoes suitable for cooking, salads and daily meals.",
    highlights: [
      "Sold fresh and restocked regularly",
      "Great for everyday cooking and salads",
    ],
  },
  atta: {
    id: "atta",
    name: "Aashirvaad Atta",
    category: "Grains & Pulses",
    categoryHref: "/categories#grains",
    unit: "5 kg",
    price: 255,
    image: "/images/products/atta.png",
    description:
      "Whole wheat atta for everyday rotis and parathas, a staple in most Indian kitchens.",
    highlights: [
      "Everyday whole wheat flour",
      "Suitable for rotis, parathas and more",
    ],
  },
  milk: {
    id: "milk",
    name: "Amul Taaza Milk",
    category: "Dairy",
    categoryHref: "/categories#dairy",
    unit: "1 L",
    price: 32,
    image: "/images/products/milk.png",
    description:
      "Toned milk for daily use — tea, coffee, cooking and everyday drinking.",
    highlights: ["Everyday toned milk", "Good for tea, coffee and cooking"],
  },
  "parle-g": {
    id: "parle-g",
    name: "Parle-G Biscuits",
    category: "Snacks",
    categoryHref: "/categories#snacks",
    unit: "200 g",
    price: 20,
    image: "/images/products/parle-g.png",
    description:
      "Classic glucose biscuits, a household favorite for tea-time and snacking.",
    highlights: [
      "Classic glucose biscuits",
      "Popular everyday tea-time snack",
    ],
  },
};

export function getProductById(id) {
  return PRODUCTS[id] ?? null;
}

export function getRelatedProducts(id, limit = 3) {
  return Object.values(PRODUCTS)
    .filter((product) => product.id !== id)
    .slice(0, limit);
}