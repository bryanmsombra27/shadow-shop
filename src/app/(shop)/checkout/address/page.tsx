import { Title } from "@/components";
import { FC } from "react";
import AddressForm from "./ui/AddressForm";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

const getCountries = async () => {
  const countries = await prisma.country.findMany({
    where: {
      active: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return countries;
};

const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    if (!address) return;

    const { countryId, ...rest } = address;

    return {
      ...address,
      country: countryId,
    };
  } catch (error) {
    console.log(error);
  }
};

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  const session = await auth();

  const countries = await getCountries();
  const address = await getUserAddress(session?.user.id!);

  return (
    <>
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
        <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
          <Title
            title="Dirección"
            subTitle="Dirección de entrega"
          />

          <AddressForm
            countries={countries}
            userStoreAddress={address as any}
          />
        </div>
      </div>
    </>
  );
};

export default page;
