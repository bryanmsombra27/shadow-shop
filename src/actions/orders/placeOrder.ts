"use server";

import { auth } from "@/auth";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId)
      return {
        error: "No hay sesion de usuario",
      };

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productsId.map((p) => p.productId),
        },
        active: true,
      },
    });

    const itemsInOrder = productsId.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const { subTotal, tax, total } = productsId.reduce(
      (acc, item) => {
        const productQuantity = item.quantity;
        const product = products.find((p) => p.id == item.productId);

        if (!product) throw new Error(`producto ${item.productId} no existe`);

        const subTotal = productQuantity * product?.price;
        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        acc.subTotal += subTotal;
        acc.tax += tax;
        acc.total += total;
        return acc;
      },
      { subTotal: 0, tax: 0, total: 0 }
    );

    const prismaTx = await prisma.$transaction(async (tx) => {
      // actualizar stock de products
      const updatedProductsPromises = products.map((product) => {
        // acumular las cantidades
        const productQuantity = productsId
          .filter((item) => item.productId == product.id)
          .reduce((acc, item) => acc + item.quantity, 0);

        if (productQuantity == 0)
          throw new Error(`${product.id}, no tiene cantidades definidas`);

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // verificar valores negativos en el stock
      updatedProducts.forEach((product) => {
        if (product.inStock <= 0)
          throw new Error(
            `El producto ${product.title} no cuenta con inventario suficiente para ser vendido `
          );
      });

      const order = await tx.order.create({
        data: {
          userId,
          subTotal,
          total,
          tax,
          itemsInOrder,
          orders: {
            createMany: {
              data: productsId.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id == p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // insertar la direccon de entrega
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          address: restAddress.address,
          city: restAddress.city,
          firstName: restAddress.firstName,
          lastName: restAddress.lastName,
          phone: restAddress.phone,
          postalCode: restAddress.postalCode,
          address2: restAddress.address2,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      success: "orden creada con exito!",
      order: prismaTx.order.id,
    };
  } catch (error: any) {
    return {
      error: "no fue posible crear la orden",
    };
  }
};
