import styles from "./Home.module.css";
import Carousel from "react-bootstrap/Carousel";
import type { ArticleData, MediaData, Theme } from "../App";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useEffect } from "react";

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

  // TODO: change when I gather enough knowledge to find the most visited article in the entire site
  const mostVisitedArticle = imagesAndInfo.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, imagesAndInfo[0]);

  useEffect(() => {
    const linkedInScript = document.createElement("script");
    linkedInScript.src = "https://platform.linkedin.com/badges/js/profile.js";
    linkedInScript.async = true; // Load asynchronously
    linkedInScript.defer = true; // Defer execution
    linkedInScript.type = "text/javascript";
    document.body.appendChild(linkedInScript);

    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.integrity =
      "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
    bootstrapScript.crossOrigin = "anonymous";
    document.body.appendChild(bootstrapScript);
  }, []); // Empty dependency array ensures it runs once after mount

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
                        <p className={styles.tag} key={tag}>
                          {tag}
                        </p>
                      ) : null
                    )}
                    <Link
                      to={`/articles/${image.id}`}
                      style={{ display: "block", background: "none" }}
                    >
                      <h2
                        className={styles.carTitle}
                        style={
                          theme === "dark"
                            ? { color: "white" }
                            : { color: "black" }
                        }
                      >
                        {image.title}
                      </h2>
                    </Link>
                    <div className={styles.centeredDetails}></div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
        <div className={styles.horizontalPosts}>
          <div className={styles.latestPost}>
            <h2 className={styles.postTitle}>Latest Post:</h2>
            <Card bg="secondary" className={styles.card}>
              {latestArticle.source_url ? (
                <>
                  <Card.Img
                    src={latestArticle.source_url}
                    variant="top"
                    className={styles.cardImg}
                  />
                  <Card.Body>
                    {latestArticle.tags.map((tag) =>
                      tag ? (
                        <p
                          className={styles.tag}
                          style={{ marginTop: "0" }}
                          key={tag}
                        >
                          {tag[0].toUpperCase() + tag.slice(1)}
                        </p>
                      ) : null
                    )}
                    <Link
                      to={`/articles/${latestArticle.id}`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                      }}
                    >
                      <Card.Title className={styles.cardTitle}>
                        {latestArticle.title}
                      </Card.Title>
                    </Link>
                    <div className={styles.cardText}>
                      {parse(DOMPurify.sanitize(latestArticle.excerpt))}
                    </div>
                  </Card.Body>
                </>
              ) : (
                <Card.Body>
                  {latestArticle.tags.map((tag) =>
                    tag ? (
                      <p className={styles.tag} key={tag}>
                        {tag[0].toUpperCase() + tag.slice(1)}
                      </p>
                    ) : null
                  )}
                  <Link
                    to={`/articles/${latestArticle.id}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                    }}
                  >
                    <Card.Title className={styles.cardTitle}>
                      {latestArticle.title}
                    </Card.Title>
                  </Link>
                  <div className={styles.cardText}>
                    {parse(DOMPurify.sanitize(latestArticle.excerpt))}
                  </div>
                </Card.Body>
              )}
            </Card>
          </div>
          <div className={styles.featuredStory}>
            <h2 className={styles.postTitle}>Featured Story:</h2>
            <Card bg="secondary" className={styles.card}>
              {mostVisitedArticle.source_url ? (
                <>
                  <Card.Img
                    src={mostVisitedArticle.source_url}
                    variant="top"
                    className={styles.cardImg}
                  />
                  <Card.Body>
                    {mostVisitedArticle.tags.map((tag) =>
                      tag ? (
                        <p
                          className={styles.tag}
                          style={{ marginTop: "0" }}
                          key={tag}
                        >
                          {tag[0].toUpperCase() + tag.slice(1)}
                        </p>
                      ) : null
                    )}
                    <Link
                      to={`/articles/${mostVisitedArticle.id}`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                      }}
                    >
                      <Card.Title className={styles.cardTitle}>
                        {mostVisitedArticle.title}
                      </Card.Title>
                    </Link>
                    <div className={styles.cardText}>
                      {parse(DOMPurify.sanitize(mostVisitedArticle.excerpt))}
                    </div>
                  </Card.Body>
                </>
              ) : (
                <Card.Body>
                  {mostVisitedArticle.tags.map((tag) =>
                    tag ? (
                      <p className={styles.tag} key={tag}>
                        {tag[0].toUpperCase() + tag.slice(1)}
                      </p>
                    ) : null
                  )}
                  <Link
                    to={`/articles/${mostVisitedArticle.id}`}
                    style={{
                      display: "block",
                      background: "rgba(0, 0, 0, 0.8)",
                      padding: "1rem 0 0.5rem",
                      borderRadius: "1rem",
                      margin: "0 0.5rem",
                      color: "white",
                    }}
                  >
                    <Card.Title className={styles.cardTitle}>
                      {mostVisitedArticle.title}
                    </Card.Title>
                  </Link>
                  <div
                    className={styles.cardText}
                    style={{
                      background: "rgba(0, 0, 0, 0.8)",
                      padding: "0.5 0.5rem 0",
                      borderRadius: "1rem",
                      margin: "0.5rem",
                      color: "white",
                    }}
                  >
                    {parse(DOMPurify.sanitize(mostVisitedArticle.excerpt))}
                  </div>
                </Card.Body>
              )}
            </Card>
          </div>
        </div>
        <div className={styles.contact}>
          <h2 className={styles.contactHeader}>Contacto</h2>
          <div
            className={`badge-base LI-profile-badge ${styles.linkedinBadge}`}
            data-locale="en_US"
            data-size="small"
            data-theme="light"
            data-type="HORIZONTAL"
            data-vanity="victor-lameda-rojas-9006331b0"
            data-version="v1"
          ></div>
        </div>
      </div>
    </>
  );
}
