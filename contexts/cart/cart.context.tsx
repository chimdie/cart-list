"use client";
import { createContext, useContext, useReducer } from "react";
import { Cart, CartAction } from "./cart.type";
import { cartReducer } from "./cartReducer";

export const initialState: Cart = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};

const CartContext = createContext<{
  cart: Cart;
  dispatch: React.Dispatch<CartAction>;
}>({ cart: initialState, dispatch: () => null });

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
};

export const useCartCxt = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContext");
  }
  return context;
};
