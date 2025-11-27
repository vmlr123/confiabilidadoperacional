import "./App.css";
import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer/Footer";
import Loading from "./shared/Loading/Loading";
import Menu from "./pages/Menu/Menu";
import ErrorBoundary from "./components/ErrorBoundary";
import RiskMatrix from "./pages/RiskMatrix/RiskMatrix";

const Articles = lazy(() => import("./pages/Articles/Articles"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Page = lazy(() => import("./pages/Page"));
const DedicatedArticlePage = lazy(
  () => import("./pages/Articles/DedicatedArticlePage")
);
const Home = lazy(() => import("./pages/Home"));

export type Theme = "light" | "dark";

export type ArticleData = {
  id?: number;
  title: { rendered: string };
  content?: { rendered: string };
  class_list: string[];
  date: Date;
  parent?: number;
  featured_media?: number;
  excerpt: { rendered: string };
};

export type PageData = ArticleData;

export type MediaData = ArticleData & {
  media_details: {
    file: string;
  };
  alt_text: string;
  source_url: string;
};

const App = React.memo(function App() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const [media, setMedia] = useState<MediaData[]>([]);
  const [loadingPages, setLoadingPages] = useState<boolean>(true);
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle("dark", savedTheme === "dark");
    } else if (window && window.matchMedia) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.body.classList.toggle("dark", initial === "dark");
    }
  }, []);

  const fetchArticles = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://confiabilidadoperacional.com/wp-json/wp/v2/posts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setArticles(data);
    } catch {
      // Error handled silently
    }
  }, []);

  const fetchPages = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://confiabilidadoperacional.com/wp-json/wp/v2/pages"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPages(data);
    } catch {
      // Error handled silently
    } finally {
      setLoadingPages(false);
    }
  }, []);

  const fetchMedia = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://confiabilidadoperacional.com/wp-json/wp/v2/media/"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMedia(data);
    } catch {
      // Error handled silently
    }
  }, []);

  useEffect(() => {
    fetchArticles();
    fetchPages();
    fetchMedia();
  }, [fetchArticles, fetchPages, fetchMedia]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="app-container">
          <Header
            isMenuClicked={isMenuClicked}
            setIsMenuClicked={setIsMenuClicked}
            isLoadingPages={loadingPages}
            theme={theme}
            toggleTheme={toggleTheme}
            articles={articles}
            pages={pages}
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
                <Suspense fallback={<Loading />}>
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
                            key={article.id}
                            path={`${article.id}`}
                            element={
                              <DedicatedArticlePage
                                id={article.id}
                                title={article.title.rendered}
                                content={article.content?.rendered ?? ""}
                                date={new Date(
                                  article.date
                                ).toLocaleDateString()}
                                featuredMediaID={article.featured_media ?? 0}
                                media={media}
                              />
                            }
                          />
                        ))}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/risk-matrix" element={<RiskMatrix />} />
                  </Routes>
                </Suspense>
              </Menu>
            )}
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
});

export default App;
