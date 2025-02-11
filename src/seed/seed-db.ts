import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //   CATEGORIAS
  const { categories, products } = initialData;

  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany({
    where: { active: true },
  });

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>);
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const productDB = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });
    const ImageData = images.map((image) => ({
      url: image,
      productId: productDB.id,
    }));

    await prisma.productImage.createMany({
      data: ImageData,
    });
  });

  //   productos
  //   const formatedProducts = products.map((product) => {
  //     const { type, images, ...rest } = product;

  //     images.forEach(image =>{

  //     })

  //     return {
  //       ...rest,
  //       categoryId: categoriesMap[type],
  //     };
  //   });

  //   await prisma.product.createMany({
  //     data: formatedProducts,
  //   });
}

(() => {
  if (process.env.NODE_ENV == "production") return;

  main();
})();
