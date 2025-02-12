import { Product } from "@/interfaces";
import { FC } from "react";
import ProductGridItem from "./ProductGridItem";
// import { Product } from "@prisma/client";

interface ProductGridProps {
  products: Product[];
}
const ProductGrid: FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10 ">
      {products.map((product) => (
        <ProductGridItem
          product={product}
          key={product.slug}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
