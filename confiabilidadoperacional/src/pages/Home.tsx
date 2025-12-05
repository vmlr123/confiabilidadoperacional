import styles from "./Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import type { ArticleData, MediaData, Theme } from "../App";
import { Link } from "react-router-dom";

export default function Home({
  articles,
  media,
  theme,
}: {
  articles: ArticleData[];
  media: MediaData[];
  theme: Theme;
}) {
  console.log(articles);
  const imagesAndInfo = articles.map((article) => {
    const mediaItem = media.find((image) => image.post === article.id);
    const tags = article.class_list.map((tag) => {
      if (tag.includes("tag-")) {
        return tag.replace(/tag-/g, "");
      }
    });
    return {
      ...mediaItem,
      title: article.title.rendered,
      tags: tags,
      date: article.date,
      id: article.id,
    };
  });
  return (
    <>
      <div className={styles.stories}>
        <div className={styles.mainStory}>
          {/*Add link to article, and in tag, add link to articles with the selected tag */}
          <div className={styles.carouselWrapper}>
            <Carousel
              indicators={true}
              data-bs-theme={theme === "dark" ? "light" : "dark"}
              className={styles.carousel}
              interval={3000}
              fade={true}
            >
              {imagesAndInfo.map((image) => (
                <Carousel.Item
                  key={image.id}
                  className={styles.carItem}
                  style={{
                    backgroundImage: `url(${
                      image?.source_url ||
                      "https://via.placeholder.com/800x500?text=No+Image"
                    })`
                  }}
                >
                  <Carousel.Caption className={styles.carCaption}>
                    {image.tags.map((tag) =>
                      tag ? (
                        <p className={styles.tag}>
                          {tag[0].toUpperCase() + tag.slice(1)}
                        </p>
                      ) : null
                    )}
                    <Link
                      to={`/articles/${image.id}`}
                      style={{ display: "block", background: "none" }}
                    >
                      <h2 className={styles.carTitle}>{image.title}</h2>
                    </Link>
                    <div className={styles.centeredDetails}>
                      <div className={styles.details}>
                        <p className={styles.author}>Por Victor Lameda</p>
                        <p className={styles.date}>
                          {new Date(image.date).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
        <div className={styles.latestPost}></div>
        <div className={styles.featuredStory}>
          {/* story with most views. coming soon...*/}
        </div>
      </div>
      <div className={styles.home}>
        <h1 className={styles.title}>Bienvenido a Confiabilidad Operacional</h1>
        <p className={styles.description}>
          Esta es la página principal de nuestro sitio web dedicado a la
          confiabilidad operacional. Aquí encontrarás información sobre
          procesos, técnicas y mejores prácticas para mejorar la eficiencia y
          seguridad en operaciones industriales.
        </p>
        <div className={styles.sections}>
          <section className={styles.section}>
            <h2>Nuestros Servicios</h2>
            <p>
              Ofrecemos consultoría especializada en confiabilidad operacional,
              análisis de riesgos y optimización de procesos.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Artículos Técnicos</h2>
            <p>
              Explora nuestros artículos sobre HAZOP, LOPA, análisis de capas de
              protección y más temas relacionados.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Contacto</h2>
            <p>
              Ponte en contacto con nosotros para más información sobre nuestros
              servicios y proyectos.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
