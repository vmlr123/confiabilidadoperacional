import React, { useState, useEffect } from "react";
import styles from "./Article.module.css";
import { Link } from "react-router-dom";
import type { MediaData } from "../../App";

type Props = {
  title: React.ReactNode;
  id?: number | string;
  date: string;
  featuredMediaID: number;
  media: MediaData[];
  description: React.ReactNode;
};

const Article = React.memo(function Article({
  id,
  title,
  date,
  media,
  featuredMediaID,
  description,
}: Props) {
  const author: string = "Víctor Humberto Lameda Barreno";
  let articleDate: string = "Fecha desconocida";
  if (date) {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      articleDate = parsed.toLocaleDateString("es-ES");
    } else {
      // If `date` is already a localized string (passed from parent), use it as-is
      articleDate = date;
    }
  }
  const slug: string = id ? "/articles/" + id : "#";
  const [picture, setPicture] = useState<string>("");
  const [alt, setAlt] = useState<string>("");

  useEffect(() => {
    if (featuredMediaID && media.length > 0) {
      const pictureData = media.find((p) => p.id === featuredMediaID);
      if (pictureData) {
        setPicture(pictureData.source_url);
        setAlt(
          pictureData.alt_text ||
            (typeof title === "string" ? title : "Article image")
        );
      } else if (id === 119) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/80zz1s24nag.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 475) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/oxqn2cxc_9q-e1763471587377.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 627) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/3044470-e1763507222881.jpeg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 582) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/3183197-e1763471482841.jpeg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 518) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/tffn3bylc5s-e1763471541414.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 327) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/odvodywkxgk-e1763482105421.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 326) {
        setPicture(
          "https://images.unsplash.com/photo-1565185178615-5fe645654b46"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 325) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/10396416.jpeg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 324) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/257700.jpeg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 323) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/10/13247379-e1761698059778.jpeg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 322) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/lmb98ootoyu.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 320) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/3760790.jpeg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 319) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/qiuwauflevg.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      } else if (id === 670) {
        setPicture(
          "https://confiabilidadoperacional.com/wp-content/uploads/2025/11/tqq4bwn_ufs-e1763647777211.jpg"
        );
        setAlt(typeof title === "string" ? title : "Article image");
      }
    }
  }, [media, featuredMediaID, id, title]);

  return (
    <>
      {/*TODO: If no picture, center .article div contents horizontally and don't render .picture div */}
      <div key={id} className={styles.article}>
        {picture && (
          <div className={styles.picture}>
            <Link to={slug} className={styles.image}>
              <img src={picture} alt={alt} />
            </Link>
          </div>
        )}
        <div className={styles.info}>
          {id ? (
            <Link to={slug} className={`${styles.titlelink} container-fluid`}>
              {title}
            </Link>
          ) : (
            <h1 className={`${styles.titlelink} container`}>{title}</h1>
          )}
          <p className={styles.date}>{articleDate}</p>
          <p className={styles.author}>
            <em>Autor: {author}</em>
          </p>
          <p className={styles.description}>{description}</p>
          {id ? (
            <Link to={slug} className={styles.button}>
              Sigue leyendo
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
});

export default Article;
