"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val).toFixed(2)),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val).toFixed(0)),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
      return {
        error: "error en las validaciones",
      };
    }

    const product = productParsed.data;

    product.slug = product.slug.replace(" ", "-").toLowerCase().trim();

    const { id, ...rest } = product;

    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // actualizar producto
        product = await prisma.product.update({
          where: {
            id,
            active: true,
          },
          data: {
            ...rest,
            price: +rest.price,
            inStock: +rest.inStock,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        // crear producto

        product = await prisma.product.create({
          data: {
            ...rest,
            price: +rest.price,
            inStock: +rest.inStock,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // PROCESO DE CARGA Y GUARDADO DE IMAGENES
      if (formData.getAll("images")) {
        const images = await uploadImage(formData.getAll("images") as File[]);

        if (!images) {
          throw new Error("No fue posible cargar las imagenes");
        }

        await prisma.productImage.createMany({
          data: images?.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        success: "Se agrego con exito!",
        product,
      };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      success: prismaTx.success,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      error: "No fue posible crear/actualizar el producto",
    };
  }
};
const uploadImage = async (images: File[]) => {
  try {
    const uploadImages = images.map(async (image) => {
      try {
        const imgBuffer = await image.arrayBuffer();
        const imageBase64 = Buffer.from(imgBuffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${imageBase64}`, {
            folder: "shadow-shop",
          })
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error, "ERROR CLOUDINARY");
        return null;
      }
    });
    const uploadedImages = await Promise.all(uploadImages);

    return uploadedImages;
  } catch (error) {
    console.log(error, "ERROR CLOUDINARY");
    return null;
  }
};
