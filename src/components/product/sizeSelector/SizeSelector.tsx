import { Size } from "@/interfaces";
import clsx from "clsx";
import { FC } from "react";

interface SizeSelectorProps {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChanged: (size: Size) => void;
}
const SizeSelector: FC<SizeSelectorProps> = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}) => {
  return (
    <div className="my-5 ">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex ">
        {availableSizes.map((size) => (
          <button
            onClick={() => onSizeChanged(size)}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size == selectedSize,
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
