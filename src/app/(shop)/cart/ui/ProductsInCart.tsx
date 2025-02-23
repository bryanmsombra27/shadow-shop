"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface ProductsInCartProps {}
const ProductsInCart: FC<ProductsInCartProps> = ({}) => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="flex mb-5"
        >
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline"
            >
              <p>
                {product.title} - {product.size} -
              </p>
            </Link>
            <p>{product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(value) =>
                updateProductQuantity(product, value)
              }
            />

            <button
              className="underline mt-3"
              onClick={() => removeFromCart(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
