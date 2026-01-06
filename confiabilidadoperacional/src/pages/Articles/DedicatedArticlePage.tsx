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
      const pictureData = media.find((p) => p.post === featuredMediaID);
      if (pictureData) {
        setPicture(pictureData.source_url);
        setAlt(pictureData.alt_text);
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
