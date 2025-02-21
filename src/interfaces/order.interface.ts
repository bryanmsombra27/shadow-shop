export interface Order {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  active: boolean;
  paidAt: null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  orderAddress: OrderAddress;
  orders: OrderItem[];
}

export interface OrderAddress {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  phone: string;
  active: boolean;
  countryId: string;
  orderId: string;
}

export interface OrderItem {
  price: number;
  quantity: number;
  size: string;
  product: ProductOrder;
}

export interface ProductOrder {
  title: string;
  slug: string;
  ProductImage: ProductImage[];
}

export interface ProductImage {
  url: string;
}
