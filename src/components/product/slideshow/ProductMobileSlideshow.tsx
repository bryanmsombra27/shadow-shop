"use client";
import { FC } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import Image from "next/image";
import ProductImage from "../product-image/ProductImage";
interface ProductMobileSlideshowProps {
  images: string[];
  title: string;
  className?: string;
}
const ProductMobileSlideshow: FC<ProductMobileSlideshowProps> = ({
  images,
  title,
  className,
}) => {
  return (
    <div className={className}>
      <Swiper
        autoplay={{
          delay: 2500,
        }}
        pagination
        style={
          {
            width: "100vw",
            height: "500px",
          } as React.CSSProperties
        }
        navigation={true}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              width={600}
              height={500}
              className=" object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductMobileSlideshow;
