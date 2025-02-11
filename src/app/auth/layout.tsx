import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}
const layout: FC<layoutProps> = ({ children }) => {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
};

export default layout;
