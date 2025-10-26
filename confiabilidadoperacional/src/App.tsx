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

export type ArticleData = {
  id?: number;
  title: { rendered: string };
  content?: { rendered: string };
  class_list: string[];
  date: Date;
};

export type PageData = ArticleData;

function App() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
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
      <Header
        isMenuClicked={isMenuClicked}
        setIsMenuClicked={setIsMenuClicked}
        isLoadingPages={loadingPages}
      />
      {loadingPages ? (
        <Loading />
      ) : (
        <Menu
          isClicked={isMenuClicked}
          setIsClicked={setIsMenuClicked}
          pages={pages}
        >
          <Routes>
            {pages.map((page) => {
              const isHome = page.title.rendered.toLowerCase() === "home";
              const slug = page.title.rendered
                .toLowerCase()
                .replace(/ /g, "-")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
              const path = isHome ? "/" : `/${slug}`;

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
              element={<Articles articles={articles} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Menu>
      )}
      <Footer />
    </>
  );
}

export default App;
