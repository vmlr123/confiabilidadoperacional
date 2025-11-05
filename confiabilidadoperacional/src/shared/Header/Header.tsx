import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import type { Theme } from "../../App";

export default function Header({
  isMenuClicked,
  setIsMenuClicked,
  isLoadingPages,
  theme,
  toggleTheme,
}: {
  isMenuClicked: boolean;
  setIsMenuClicked: (value: boolean) => void;
  isLoadingPages: boolean;
  theme: Theme;
  toggleTheme: () => void;
}) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.currentinfo}>
          <div className={styles.news}>
            <p className={styles.trendingstatic}>🔥 Lo último en noticias: </p>
            <p className={styles.trendingnews}></p>
          </div>
          <div className={styles.today}>
            <p className={styles.currentdate}>📆</p>
            <p className={styles.currenttime}></p>
          </div>
        </div>
        <div className={styles.banner}>
          <div className={styles.infront}>
          <img
            src="https://confiabilidadoperacional.com/wp-content/uploads/2025/10/cropped-LOGO-CO-3D-W.png"
            alt="White website icon"
            className={styles.bannerimg}
          />
          <p className={styles.phrase}>Hacia la Excelencia Operacional.</p>
          </div>
        </div>
        <nav>
          {isLoadingPages ? null : (
            <>
              <a onClick={() => setIsMenuClicked(!isMenuClicked)}>Menú</a>
              <button className={styles.themeToggle} onClick={toggleTheme}>
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </>
          )}
          <Link to="/" className={styles.page}>
            <img
              src="https://confiabilidadoperacional.com/wp-content/uploads/2025/10/cropped-LOGO-CO-3D-270x270.png"
              alt="Website icon"
              className={styles.icon}
            />
          </Link>
        </nav>
      </header>
    </>
  );
}
