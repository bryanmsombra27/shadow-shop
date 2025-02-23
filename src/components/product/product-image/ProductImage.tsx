import Image from "next/image";
import { FC, StyleHTMLAttributes } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  style?: StyleHTMLAttributes<HTMLImageElement>["style"];
}

const ProductImage: FC<ProductImageProps> = ({
  alt,
  height,
  width,
  className,
  style,
  src,
}) => {
  const imagePath = (imagePath: string) => {
    if (imagePath && imagePath.startsWith("https")) {
      return imagePath;
    } else if (imagePath) {
      return `/products/${imagePath}`;
    } else {
      return "/imgs/placeholder.jpg";
    }
  };

  return (
    <Image
      style={style}
      src={imagePath(src!)}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ProductImage;
