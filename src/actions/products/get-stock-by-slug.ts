"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        active: true,
        slug,
      },
      select: {
        inStock: true,
      },
    });

    return product?.inStock ?? 0;
  } catch (error) {
    console.log(error);
    throw new Error("No se encontro stock del producto");
  }
};
