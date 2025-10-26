import type { ReactNode } from "react";
import styles from "./Article.module.css";

type Props = {
  title: ReactNode;
  content: ReactNode;
  id?: number | string;
  date: string;
};

export default function DedicatedArticlePage({ id, title, content, date }: Props) {
  const author = "Víctor Humberto Lameda Barreno";
  const articleDate = new Date(date).toLocaleDateString();
  console.log(content);
  return (
    <div key={id} className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <p>{articleDate}</p>
      <h5 className={styles.author}>
        <em>Autor: {author}</em>
      </h5>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
