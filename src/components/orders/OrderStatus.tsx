import clsx from "clsx";
import { FC } from "react";
import { IoCartOutline } from "react-icons/io5";

interface OrderStatusProps {
  isPaid: boolean;
}
const OrderStatus: FC<OrderStatusProps> = ({ isPaid }) => {
  return (
    <>
      <div
        className={clsx(
          "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
          {
            "bg-red-500": !isPaid,
            "bg-green-700": isPaid,
          }
        )}
      >
        <IoCartOutline size={30} />
        {/* <span className="mx-2">Pendiente de pago</span> */}
        <span className="mx-2">{isPaid ? "Pagada" : "Pendiente de pago"} </span>
      </div>
    </>
  );
};

export default OrderStatus;
