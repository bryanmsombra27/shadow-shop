import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}
const layout: FC<layoutProps> = ({ children }) => {
  return <main className="min-h-screen ">{children}</main>;
};

export default layout;
