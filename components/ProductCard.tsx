"use client";
import React from "react";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";
import { currencyParser } from "@/lib/currencyParser";
import { useCartCxt } from "@/contexts/cart/cart.context";
import { AddToCartIcon } from "@/app/assets/Icons/AddToCartIcon";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

type ProductCardT = {
  product: Product;
};

const style =
  "flex items-center border border-cart-rose-400 hover:border-cart-red px-6 py-2.5 md:py-2 bg-white rounded-full w-44 transition-all duration-200 group ease-linear text-sm";

export function ProductCard({ product }: ProductCardT) {
  const { cart, dispatch } = useCartCxt();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
  };

  const decreaseCart = () => {
    dispatch({
      type: "REDUCE_QTY",
      payload: { product, quantity: 1 },
    });
  };

  const cartItem = cart.items.find((item) => item.product.id === product.id);
  const productQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="relative overflow-hidden flex flex-col space-y-8">
      <div className="relative">
        <Image
          src={product.image.desktop}
          alt={product.name}
          width={400}
          height={400}
          priority
          className={`rounded-lg w-full h-full transition-all border-2 ease-linear ${
            productQuantity > 0 ? "border-cart-red" : "border-transparent"
          }`}
        />
        <div className="absolute flex items-center justify-center w-full -mt-6 z-10 transition-all">
          {productQuantity ? (
            <div
              className={`bg-cart-red justify-between text-white ${style}`}
              style={{ background: "#c73a0f" }} // DON'T DO IT
            >
              <button
                onClick={decreaseCart}
                className="outline-none focus:outline-none"
                aria-label="decrease-button"
              >
                <MinusCircle className="text-sm text-white" />
              </button>
              <span>{productQuantity}</span>
              <button
                onClick={handleAddToCart}
                className="outline-none focus:outline-none"
                aria-label="increase-button"
              >
                <PlusCircle className="text-sm text-white" />
              </button>
            </div>
          ) : (
            <button onClick={handleAddToCart} className={`space-x-1 ${style}`}>
              <AddToCartIcon />
              <span className="group-hover:text-cart-red font-medium">Add to card</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-">
        <span className="text-sm font-normal text-cart-rose-400">{product.category}</span>
        <span className="text-base font-semibold text-cart-rose-900">{product.name}</span>
        <span className="text-base font-semibold text-cart-red">
          {currencyParser(+product.price)}
        </span>
      </div>
    </div>
  );
}
