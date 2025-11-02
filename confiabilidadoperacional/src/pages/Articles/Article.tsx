import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import styles from "./Article.module.css";
import { Link } from "react-router-dom";
import type { MediaData } from "../../App";

type Props = {
  title: ReactNode;
  id?: number | string;
  date: string;
  featuredMediaID: number;
  media: MediaData[];
};

export default function Article({
  id,
  title,
  date,
  media,
  featuredMediaID,
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
        setAlt(pictureData.alt_text);
      }
    }
  }, [media, featuredMediaID]);

  return (
    <>
      <div key={id} className={styles.article}>
        <img src={picture} alt={alt} />
        {id ? (
          <Link to={slug}>
            <h1 className={styles.title}>{title}</h1>
          </Link>
        ) : (
          <h1 className={styles.title}>{title}</h1>
        )}
        <p>{articleDate}</p>
        <h5 className={styles.author}>
          <em>Autor: {author}</em>
        </h5>
      </div>
    </>
  );
}
