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
  return (
    <div className={styles.page}>
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
