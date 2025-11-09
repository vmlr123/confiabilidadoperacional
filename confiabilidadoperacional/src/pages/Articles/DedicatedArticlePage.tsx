import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import styles from "./DedicatedArticlePage.module.css";
import type { MediaData } from "../../App";

type Props = {
  title: React.ReactNode;
  content: string;
  id?: number | string;
  date: string;
  media: MediaData[];
  featuredMediaID: number;
};

const DedicatedArticlePage = React.memo(function DedicatedArticlePage({
  id,
  title,
  content,
  date,
  media,
  featuredMediaID,
}: Props) {
  const author = "Víctor Humberto Lameda Barreno";
  const [picture, setPicture] = useState<string>("");
  const [alt, setAlt] = useState<string>("");

  useEffect(() => {
    if (featuredMediaID && media.length > 0) {
      const pictureData = media.find((p) => p.id === featuredMediaID);
      if (pictureData) {
        setPicture(pictureData.source_url);
        setAlt(pictureData.alt_text);
      } else if (id === 119) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/80zz1s24nag.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 327) {
        setPicture("/src/assets/odvodywkxgk-e1761709472757.jpg.jpeg");
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 326) {
        setPicture(
          "https://images.unsplash.com/photo-1565185178615-5fe645654b46"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 325) {
        setPicture("/src/assets/10396416.jpeg");
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 324) {
        setPicture("/src/assets/257700.jpeg");
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 323) {
        setPicture("/src/assets/13247379-e1761698059778.jpeg");
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 322) {
        setPicture("/src/assets/lmb98ootoyu.jpg.jpeg");
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 320) {
        setPicture("/src/assets/3760790.jpeg");
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 319) {
        setPicture("/src/assets/qiuwauflevg.jpg.jpeg");
        setAlt(typeof title === "string" ? title : "Article image");
      }
    }
  }, [featuredMediaID, media, picture, id, title]);

  return (
    <div key={id} className={styles.article}>
      {picture && <img src={picture} alt={alt} className={styles.pic} />}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.date}>{date}</p>
      <h5 className={styles.author}>
        <em>Autor: {author}</em>
      </h5>
      <div className={styles.content}>
        {
          parse(
            DOMPurify.sanitize(content || "No se pudo cargar el contenido")
          ) as React.ReactNode
        }
      </div>
    </div>
  );
});

export default DedicatedArticlePage;
