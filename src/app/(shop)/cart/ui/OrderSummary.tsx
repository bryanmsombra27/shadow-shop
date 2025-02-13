"use client";
import { useCartStore } from "@/store";
import { formatCurrency } from "@/utils";
import { FC, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

interface OrderSummaryProps {}
const OrderSummary: FC<OrderSummaryProps> = ({}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart == 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>
        <span>Subtotal</span>
        <span className="text-right"> {formatCurrency(subTotal)} </span>
        <span>Impuestos (15%)</span>
        <span className="text-right"> {formatCurrency(tax)}</span>
        <span className="mt-5 text-2xl ">Total: </span>
        <span className="text-right mt-5 text-2xl">
          {formatCurrency(total)}{" "}
        </span>
      </div>
    </>
  );
};

export default OrderSummary;
