export const revalidate = 0;

import { getAllUsers } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { FC } from "react";
import UserTable from "./ui/UserTable";

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  const users = (await getAllUsers()) as any;

  if (users.error) redirect("/auth/login");

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UserTable users={users.users} />
      </div>
    </>
  );
};

export default page;
