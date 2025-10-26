import DropdownMenu from "../../shared/Header/DropdownMenu";
import type { PageData } from "../../App";
import type { ReactNode } from "react";

export default function Menu({
  isClicked,
  setIsClicked,
  pages,
  children,
}: {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
  pages: PageData[];
  children: ReactNode;
}) {
  return (
    <>
      <DropdownMenu
        pages={pages}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      >
        {children}
      </DropdownMenu>
    </>
  );
}
