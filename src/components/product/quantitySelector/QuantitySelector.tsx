"use client";
import { FC } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChanged,
}) => {
  // const [counter, setCounter] = useState<number>(quantity);

  const changeQuantity = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex ">
      <button onClick={() => changeQuantity(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => changeQuantity(1)}>
        <IoIosAddCircleOutline size={30} />
      </button>
    </div>
  );
};

export default QuantitySelector;
