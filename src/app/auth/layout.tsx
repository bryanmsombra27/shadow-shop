import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}
const layout: FC<layoutProps> = async ({ children }) => {
  const session = await auth();

  if (session?.user) redirect("/");

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
};

export default layout;
