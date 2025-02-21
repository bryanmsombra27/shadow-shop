import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //   CATEGORIAS
  const { categories, products, users, countries } = initialData;

  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  await prisma.user.createMany({
    data: users,
  });

  await prisma.country.createMany({
    data: countries,
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
}

(() => {
  if (process.env.NODE_ENV == "production") return;

  main();
})();
