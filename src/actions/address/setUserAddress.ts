"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      success: "Direccion creada con exito!",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error al guardar la direccion del usuario",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    const addressToSave = {
      address: address.address,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      address2: address.adddress2,
      userId: userId,
      countryId: address.country,
      city: address.city,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }
    const updatedAddress = await prisma.userAddress.update({
      data: addressToSave,
      where: {
        userId,
      },
    });

    return {
      success: "Direccion actualizada con exito! ",
      address: updatedAddress,
    };
  } catch (error) {
    throw new Error("no se guardo la direccion");
    return {
      message: "Error al guardar la direccion del usuario",
    };
  }
};
