import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Articles from "./pages/Articles/Articles";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer/Footer";
import NotFound from "./pages/NotFound";
import Page from "./pages/Page";
import Loading from "./shared/Loading/Loading";
import Menu from "./pages/Menu/Menu";
import DedicatedArticlePage from "./pages/Articles/DedicatedArticlePage";
import Home from "./pages/Home";

export type ArticleData = {
  id?: number;
  title: { rendered: string };
  content?: { rendered: string };
  class_list: string[];
  date: Date;
  parent?: number;
  featured_media?: number;
};

export type PageData = ArticleData;

export type MediaData = ArticleData & {
  media_details: {
    file: string;
  };
  alt_text: string;
  source_url: string;
};

function App() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const [media, setMedia] = useState<MediaData[]>([]);
  const [loadingPages, setLoadingPages] = useState<boolean>(true);
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);

  async function fetchArticles(): Promise<void> {
    try {
      const response = await fetch(
        "https://confiabilidadoperacional.com/wp-json/wp/v2/posts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
  }
  async function fetchPages(): Promise<void> {
    try {
      const response = await fetch(
        "https://confiabilidadoperacional.com/wp-json/wp/v2/pages"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPages(data);
      setLoadingPages(false);
    } catch (error) {
      console.error("Error fetching page data:", error);
      setLoadingPages(false);
    }
  }
  async function fetchMedia(): Promise<void> {
    try {
      const response = await fetch(
        "https://confiabilidadoperacional.com/wp-json/wp/v2/media/"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMedia(data);
    } catch (error) {
      console.error("Error fetching media data:", error);
    }
  }

  useEffect(() => {
    fetchArticles();
    fetchPages();
    fetchMedia();
  }, []);

  return (
    <div className="app-container">
      <Header
        isMenuClicked={isMenuClicked}
        setIsMenuClicked={setIsMenuClicked}
        isLoadingPages={loadingPages}
      />
      <div className="main-content">
        {loadingPages ? (
          <Loading />
        ) : (
          <Menu
            isClicked={isMenuClicked}
            setIsClicked={setIsMenuClicked}
            pages={pages}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              {pages.map((page) => {
                const slug = page.title.rendered
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/\//g, "-")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");
                const path = `/${slug}`;

                return (
                  <Route
                    key={page.id}
                    path={path}
                    element={
                      <Page
                        title={page.title.rendered}
                        content={page.content?.rendered ?? ""}
                      />
                    }
                  />
                );
              })}
              <Route
                path="/articles"
                element={<Articles articles={articles} media={media} />}
              >
                {articles
                  .filter((article) => article.id !== undefined)
                  .map((article) => (
                    <Route
                      path={`${article.id}`}
                      element={
                        <DedicatedArticlePage
                          id={article.id}
                          title={article.title.rendered}
                          content={article.content?.rendered ?? ""}
                          date={new Date(article.date).toLocaleDateString()}
                          featuredMediaID={article.featured_media ?? 0}
                          media={media}
                        />
                      }
                    />
                  ))}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Menu>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
