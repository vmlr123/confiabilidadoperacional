import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import styles from "./DedicatedArticlePage.module.css";
import type { MediaData } from "../../App";
import { articleImages } from "../../utils/imageImports";

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
      } else {
        // Use imported images as fallback
        const articleId = typeof id === "number" ? id : parseInt(id as string);
        const fallbackImage = articleImages[articleId];
        if (fallbackImage) {
          setPicture(fallbackImage);
          setAlt(typeof title === "string" ? title : "Article image");
        } else if (id === 119) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/80zz1s24nag.jpg"
          );
        } else if (id === 475) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/oxqn2cxc_9q-e1763471587377.jpg"
          );
        } else if (id === 627) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/3044470-e1763507222881.jpeg"
          );
        } else if (id === 582) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/3183197-e1763471482841.jpeg"
          );
        } else if (id === 518) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/tffn3bylc5s-e1763471541414.jpg"
          );
        } else if (id === 327) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/odvodywkxgk-e1763482105421.jpg"
          );
        } else if (id === 326) {
          setPicture(
            "https://images.unsplash.com/photo-1565185178615-5fe645654b46"
          );
        } else if (id === 325) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/10396416.jpeg"
          );
        } else if (id === 324) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/257700.jpeg"
          );
        } else if (id === 323) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/13247379-e1761698059778.jpeg"
          );
        } else if (id === 322) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/lmb98ootoyu.jpg"
          );
        } else if (id === 320) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/3760790.jpeg"
          );
        } else if (id === 319) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/qiuwauflevg.jpg"
          );
        } else if (id === 670) {
          setPicture(
            "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/tqq4bwn_ufs-e1763647777211.jpg"
          );
        }
        setAlt(typeof title === "string" ? title : "Article image");
      }
    }
  }, [featuredMediaID, media, id, title]);

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
