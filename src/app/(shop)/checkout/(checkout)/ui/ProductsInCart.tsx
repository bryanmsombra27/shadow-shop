"use client";

import { ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ProductsInCartProps {}
const ProductsInCart: FC<ProductsInCartProps> = ({}) => {
  const productsInCart = useCartStore((state) => state.cart);

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
            <span>
              <p>
                {product.title} - {product.size} ({product.quantity})
              </p>
            </span>
            <p className="font-bold ">
              {formatCurrency(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
