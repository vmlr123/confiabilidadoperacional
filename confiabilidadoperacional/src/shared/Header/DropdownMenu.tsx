import Links from "./Links";
import type { PageData } from "../../App";
import type { ReactNode } from "react";

export default function DropdownMenu({
  pages,
  isClicked,
  setIsClicked,
  children,
}: {
  pages?: PageData[];
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
  children: ReactNode;
}) {
  return (
    <>
      {isClicked ? (
        <Links
          pages={pages}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      ) : (
        children
      )}
    </>
  );
}
