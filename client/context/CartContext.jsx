"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "guptamart-cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage after the component mounts.
useEffect(() => {
  let storedCart = [];

  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);

      if (Array.isArray(parsedCart)) {
        storedCart = parsedCart;
      }
    }
  } catch (error) {
    console.error("Failed to load cart:", error);
  }

  const timer = setTimeout(() => {
    setCartItems(storedCart);
    setIsHydrated(true);
  }, 0);

  return () => clearTimeout(timer);
}, []);

  // Persist cart whenever it changes.
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, isHydrated]);

  function addToCart(product, quantity = 1) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, 20),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          unit: product.unit,
          price: product.price,
          image: product.image,
          quantity: Math.min(quantity, 20),
        },
      ];
    });
  }

  function updateQuantity(productId, quantity) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(Math.max(quantity, 1), 20),
            }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    isHydrated,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}