export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: Type;
  gender: "men" | "women" | "kid" | "unisex";
}

export interface CartProduct {
  id: string;
  slug: string;
  price: number;
  title: string;
  quantity: number;
  size: Size;
  image: string;
}

export interface SummaryInfo {
  subTotal: number;
  total: number;
  tax: number;
  itemsInCart: number;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
type Type = "shirts" | "pants" | "hoodies" | "hats";
