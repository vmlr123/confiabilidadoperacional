import styles from "./Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import type { ArticleData, MediaData, Theme } from "../App";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

export default function Home({
  articles,
  media,
  theme,
}: {
  articles: ArticleData[];
  media: MediaData[];
  theme: Theme;
}) {
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
      excerpt: article.excerpt.rendered,
      tags: tags,
      date: article.date,
      id: article.id,
    };
  });

  const latestArticle = imagesAndInfo.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, imagesAndInfo[0]);

  // TODO: change when I gather enough knowledge to find the most visited article in the entire
  const mostVisitedArticle = imagesAndInfo.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, imagesAndInfo[0]);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.mainStory}>
          {/*TODO: add link to articles with the selected tag */}
          <div
            className={styles.carouselWrapper}
            style={{
              border: "1px solid black",
              borderRadius: "1rem",
              margin: "1rem",
            }}
          >
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
                    })`,
                    borderRadius: "1rem",
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
        <div
          className={styles.horizontalPosts}
          style={{
            border: "1px solid black",
            borderRadius: "1rem",
            margin: "1rem",
            padding: "1rem",
          }}
        >
          <div className={styles.latestPost}>
            <h2 className={styles.postTitle}>Latest Post:</h2>
            <Card bg="secondary" style={{ padding: 0, margin: "0.5rem" }}>
              <Card.Img
                src={latestArticle.source_url}
                variant="top"
                className={styles.cardImg}
              />
              <Card.ImgOverlay>
                {latestArticle.tags.map((tag) =>
                  tag ? (
                    <p className={styles.tag} style={{ marginTop: "0" }}>
                      {tag[0].toUpperCase() + tag.slice(1)}
                    </p>
                  ) : null
                )}
                <Link
                  to={`/articles/${latestArticle.id}`}
                  style={{
                    display: "block",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "1rem",
                    borderRadius: "1rem",
                    margin: "0 0.5rem 0.5rem",
                    color: "white",
                  }}
                >
                  <Card.Title className={styles.cardTitle}>
                    {latestArticle.title}
                  </Card.Title>
                </Link>
                <Card.Text
                  className={styles.cardText}
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "0.5 0.5rem 0",
                    borderRadius: "1rem",
                    margin: "0.5rem",
                    color: "white",
                  }}
                >
                  {parse(DOMPurify.sanitize(latestArticle.excerpt))}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
          <div className={styles.featuredStory}>
            <h2 className={styles.postTitle}>Featured Story:</h2>
            <Card bg="secondary" style={{ padding: 0, margin: "0.5rem" }}>
              <Card.Img
                src={mostVisitedArticle.source_url}
                variant="top"
                className={styles.cardImg}
              />
              <Card.ImgOverlay>
                {mostVisitedArticle.tags.map((tag) =>
                  tag ? (
                    <p className={styles.tag} style={{ marginTop: "0" }}>
                      {tag[0].toUpperCase() + tag.slice(1)}
                    </p>
                  ) : null
                )}
                <Link
                  to={`/articles/${mostVisitedArticle.id}`}
                  style={{
                    display: "block",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "1rem",
                    borderRadius: "1rem",
                    margin: "0 0.5rem 0.5rem",
                    color: "white",
                  }}
                >
                  <Card.Title className={styles.cardTitle}>
                    {mostVisitedArticle.title}
                  </Card.Title>
                </Link>
                <Card.Text
                  className={styles.cardText}
                  style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "0.5 0.5rem 0",
                    borderRadius: "1rem",
                    margin: "0.5rem",
                    color: "white",
                  }}
                >
                  {parse(DOMPurify.sanitize(mostVisitedArticle.excerpt))}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
