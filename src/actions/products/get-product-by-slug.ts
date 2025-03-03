"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        active: true,
        slug,
      },
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
          },
        },
      },
    });
    // if (!product) throw new Error("Producto no encontrado");
    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
};
