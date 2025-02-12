"use server";

import prisma from "@/lib/prisma";
import { Gender, Prisma } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  limit?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  limit = 12,
  page = 1,
  gender,
}: PaginationOptions) => {
  if (isNaN(+page)) page = 1;

  if (page < 1) page = 1;

  try {
    const clauseCount: Prisma.ProductCountArgs = {
      where: {
        active: true,
      },
    };

    if (gender) {
      clauseCount.where = {
        active: true,
        gender: gender,
      };
    }

    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        active: true,
        gender: gender,
      },
      include: {
        ProductImage: {
          take: 2,

          select: {
            url: true,
          },
        },
      },
    });
    const totalCount = await prisma.product.count(clauseCount);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      currentPage: page,
      totalPages,
      products: products.map((p) => ({
        ...p,
        images: p.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
