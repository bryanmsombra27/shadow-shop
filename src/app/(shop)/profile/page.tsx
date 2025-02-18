import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  const session = await auth();

  //   if (!session?.user) redirect("/auth/login?returnTo=/profile");
  if (!session?.user) redirect("/");

  return (
    <>
      <Title title="Perfil" />

      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h1>{session.user.role}</h1>
    </>
  );
};

export default page;
