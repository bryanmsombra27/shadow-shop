"use server";

import prisma from "@/lib/prisma";

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        active: true,
      },
    });

    return {
      success: "Categorias encontradas",
      categories,
    };
  } catch (error) {
    return {
      error: "No fue posible cargar las categorias",
    };
  }
};
