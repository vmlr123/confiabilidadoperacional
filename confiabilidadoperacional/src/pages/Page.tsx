import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { type ReactNode } from "react";
import styles from "./Page.module.css";

export default function Page({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const isHome = title.toLowerCase() === "home";
  const listOfPagesWithTables: string[] = [
    "Técnicas de Apreciación del Riesgo",
  ];
  return (
    <div className={styles.page}>
      {listOfPagesWithTables.includes(title) && (
        <h4>
          Ésta página contiene una tabla. Si está utilizando un dispositivo con
          una pantalla pequeña (como un teléfono), por favor ponga el
          dispositivo en modo horizontal.
        </h4>
      )}
      <h2 className={styles.title}>
        {
          parse(
            DOMPurify.sanitize(
              (isHome ? "Inicio" : title) || "No se pudo cargar el contenido."
            )
          ) as ReactNode
        }
      </h2>
      <div className={styles.content}>
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
