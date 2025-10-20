import type { ReactNode } from "react";
import styles from "./Article.module.css";

type Props = {
  title: ReactNode;
  content: ReactNode;
  key?: number | string;
};

export default function Article({ key, title, content }: Props) {
  const author = "Víctor Humberto Lameda Barreno";
  console.log(content);
  return (
    <div key={key} className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <h5 className={styles.author}>
        <em>Autor: {author}</em>
      </h5>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
