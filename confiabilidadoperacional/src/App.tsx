import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Articles from "./pages/Articles/Articles";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer/Footer";
import NotFound from "./pages/NotFound";
import Page from "./pages/Page";
import Loading from "./shared/Loading/Loading";
import Menu from "./pages/Menu";

export type ArticleData = {
  id?: number;
  title: { rendered: string };
  content?: { rendered: string };
};

export type PageData = ArticleData;

function App() {
  const [articles, setArticles] = useState<PageData[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
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
      console.log(data);
      setArticles(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      console.log(data);
      setPages(data);
      setLoadingPages(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingPages(false);
    }
  }

  useEffect(() => {
    fetchArticles();
    fetchPages();
  }, []);

  return (
    <>
      <Header pages={pages} />
      {loadingPages ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/menu"
            element={
              <Menu isClicked={isMenuClicked} setIsClicked={setIsMenuClicked} />
            }
          />
          <Route path="/articles" element={<Articles articles={articles} />} />
          {pages.map((page, i) => {
            const isHome = page.title.rendered.toLowerCase() === "home";
            const slug = page.title.rendered
              .toLowerCase()
              .replace(/ /g, "-")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            const path = isHome ? "/" : `/${slug}`;

            return (
              <Route
                key={page.id ?? i}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <Footer />
    </>
  );
}

export default App;
