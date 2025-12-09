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
      const pictureData = media.find((p) => p.post === featuredMediaID);
      if (pictureData) {
        setPicture(pictureData.source_url);
        setAlt(pictureData.alt_text);
      }
    }
  }, [featuredMediaID, media, id, title]);

  return (
    <>
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
          <div className={styles.description}>{description}</div>
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
