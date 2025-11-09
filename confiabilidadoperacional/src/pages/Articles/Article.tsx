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
  const articleDate: string = new Date(date).toLocaleDateString();
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
  }, [media, featuredMediaID, id, title]);

  return (
    <>
      <div key={id} className={styles.article}>
        <div className={styles.picture}>
          {picture && (
            <Link to={slug} className={styles.image}>
              <img src={picture} alt={alt} />
            </Link>
          )}
        </div>
        <div className={styles.info}>
          {id ? (
            <Link to={slug}>
              <h1 className={styles.title}>{title}</h1>
            </Link>
          ) : (
            <h1 className={styles.title}>{title}</h1>
          )}
          <p>{articleDate}</p>
          <p className={styles.author}>
            <em>Autor: {author}</em>
          </p>
          <p>{description}</p>
          {id ? (
            <Link to={slug} className={styles.button}>
              <p>Sigue leyendo</p>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
});

export default Article;
