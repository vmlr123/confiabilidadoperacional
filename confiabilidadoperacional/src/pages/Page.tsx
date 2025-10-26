import parse from "html-react-parser";
import DOMPurify from "dompurify";
import type { ReactNode } from "react";

export default function Page({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="page">
      <h2 className="title">
        {
          parse(
            DOMPurify.sanitize(title || "No se pudo cargar el contenido.")
          ) as ReactNode
        }
      </h2>
      <div className="content">
        {
          parse(
            DOMPurify.sanitize(
              content ||
                "No se pudo cargar el contenido. Por favor intente recargar la página."
            )
          ) as ReactNode
        }
      </div>
    </div>
  );
}
