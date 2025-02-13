"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { FC, useState } from "react";

interface AddToCartProps {
  product: Product;
}
const AddToCart: FC<AddToCartProps> = ({ product }) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      size: size,
      slug: product.slug,
      title: product.title,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-600 fade-in">
          Debe de seleccionar una talla *
        </span>
      )}

      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />

      <button
        className="btn-primary my-5"
        onClick={addToCart}
      >
        {" "}
        Agregar al carrito
      </button>
    </>
  );
};

export default AddToCart;
