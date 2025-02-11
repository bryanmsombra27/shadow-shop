import { Footer, Sidebar, TopMenu } from "@/components";
import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}
const layout: FC<layoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen ">
      <TopMenu />
      <Sidebar />

      <div className="px-0 sm:px-10">{children}</div>

      <Footer />
    </main>
  );
};

export default layout;
