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
            src="src\assets\reliable_icon.png"
            alt="Website icon"
            className={styles.icon}
          />
        </Link>
      </header>
    </>
  );
}
