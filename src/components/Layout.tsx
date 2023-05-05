import { FC, ReactNode } from "react";
import NavSide from "./NavSide";
import { useCheckUser } from "@/hooks/useCheckUser";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  useCheckUser();
  return (
    <NavSide>
      <div className="w-full p-5">{children}</div>
    </NavSide>
  );
};
export default Layout;
