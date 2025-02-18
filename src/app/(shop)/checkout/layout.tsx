import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}
const layout: FC<layoutProps> = async ({ children }) => {
  const session = await auth();

  if (!session?.user) redirect("/auth/login?redirectTo=/checkout/address");

  return <>{children}</>;
};

export default layout;
