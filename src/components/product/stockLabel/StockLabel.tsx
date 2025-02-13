"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { FC, useEffect, useState } from "react";

interface StockLabelProps {
  slug: string;
}
const StockLabel: FC<StockLabelProps> = ({ slug }) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const stock = await getStockBySlug(slug);

    setStock(stock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-900`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};

export default StockLabel;
