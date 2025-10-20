import Article from "./Article";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import type { ReactNode } from "react";

type ArticleType = {
  id?: number;
  title: { rendered: string };
  content?: { rendered: string };
};

export default function Articles({ articles }: { articles: ArticleType[] }) {
  return (
    <>
      {articles.map((article) => (
        <Article
          key={article.id}
          title={
            parse(
              DOMPurify.sanitize(
                article.title.rendered || "No se pudo cargar el contenido"
              )
            ) as ReactNode
          }
          content={
            parse(
              DOMPurify.sanitize(
                article.content?.rendered ||
                  "No se pudo cargar el contenido. Por favor intente recargar la página."
              )
            ) as ReactNode
          }
        />
      ))}
    </>
  );
}
