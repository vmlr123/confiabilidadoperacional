import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import type { Theme, ArticleData, PageData } from "../../App";
import { useEffect, useState, useRef } from "react";
import LinksDesktop from "./LinksDesktop";
import Draggable from "react-draggable";

interface WeatherData {
  temperature: number;
  description: string;
}

export default function Header({
  isMenuClicked,
  setIsMenuClicked,
  isLoadingPages,
  theme,
  toggleTheme,
  articles,
  pages,
}: {
  isMenuClicked: boolean;
  setIsMenuClicked: (value: boolean) => void;
  isLoadingPages: boolean;
  theme: Theme;
  toggleTheme: () => void;
  articles: ArticleData[];
  pages: PageData[];
}): React.JSX.Element {
  const bannerRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState<Date>(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [currentText, setCurrentText] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get user's location
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { latitude, longitude } = position.coords;

        // Fetch weather data from OpenWeatherMap API
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Weather API request failed");
        }

        const data = await response.json();
        setWeather({
          temperature: Math.round(data.main.temp - 273.15),
          description: data.weather[0].description,
        });
      } catch {
        // Fallback to a default message or leave empty
        setWeather(null);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;

    const safeTime = (d?: string | Date) => {
      if (!d) return 0;
      if (d instanceof Date) {
        const t = d.getTime();
        return isNaN(t) ? 0 : t;
      }
      const parsed = new Date(d);
      const t = parsed.getTime();
      return isNaN(t) ? 0 : t;
    };

    const sortedArticles: ArticleData[] = [...articles].sort(
      (a, b) => safeTime(b.date) - safeTime(a.date)
    );
    const titles: string[] = sortedArticles.map((article) =>
      typeof article.title.rendered === "string"
        ? article.title.rendered
        : "Could not get titles"
    );

    let articleIndex: number = 0;
    let charIndex: number = 0;
    let typingInterval: number;

    const typeText = () => {
      if (articleIndex >= titles.length) {
        articleIndex = 0;
        charIndex = 0;
        setCurrentText("");
        setTimeout(typeText, 2000); // Pause before restarting
        return;
      }

      const currentTitle: string = titles[articleIndex];
      if (charIndex < currentTitle.length) {
        setCurrentText(currentTitle.slice(0, charIndex + 1));
        charIndex++;
        typingInterval = setTimeout(typeText, 100); // Typing speed
      } else {
        // Finished typing current title, move to next after pause
        setTimeout(() => {
          articleIndex++;
          charIndex = 0;
          setCurrentText("");
          typeText();
        }, 3000); // Pause before next article
      }
    };

    typeText();

    return () => {
      if (typingInterval) clearTimeout(typingInterval);
    };
  }, [articles]);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.currentinfo}>
          <div className={styles.news}>
            <p className={styles.trendingstatic}>🔥 Lo último: </p>
            <p className={styles.trendingnews}>{currentText}</p>
          </div>
          <div className={styles.today}>
            <p className={styles.currentdate}>
              📆 {now.toLocaleDateString("es-ES")}
            </p>
            <p className={styles.currenttime}>
              {" "}
              {now.getHours()}:
              {now.getMinutes() < 10
                ? "0" + now.getMinutes()
                : now.getMinutes()}
              :
              {now.getSeconds() < 10
                ? "0" + now.getSeconds()
                : now.getSeconds()}
            </p>
            <p className={styles.currenttemp}>
              {weather
                ? `🌡️ ${weather.temperature}°C`
                : "🌤️ Cargando temperatura..."}
            </p>
          </div>
        </div>
        <div ref={bannerRef} className={styles.banner}>
          <div className={styles.infront}>
            <Draggable nodeRef={nodeRef}>
              <div ref={nodeRef}>
                <Link to="/" className={styles.draggableimglink}>
                  <img
                    src="https://confiabilidadoperacional.com/wp-content/uploads/2025/10/cropped-LOGO-CO-3D-W.png"
                    alt="White website icon"
                    className={styles.bannerimg}
                  />
                </Link>
              </div>
            </Draggable>
            <p className={styles.phrase}>Hacia la Excelencia Operacional.</p>
          </div>
        </div>
        <nav>
          {isLoadingPages ? null : (
            <>
              <a
                onClick={() => setIsMenuClicked(!isMenuClicked)}
                className={styles.menubutton}
              >
                Menú
              </a>
              <div className={styles.linksdesktop}>
                <LinksDesktop pages={pages} />
              </div>
              <button className={styles.themeToggle} onClick={toggleTheme}>
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </>
          )}
          <Link to="/" className={styles.page}>
            <img
              src="https://confiabilidadoperacional.com/wp-content/uploads/2025/10/cropped-LOGO-CO-3D-W.png"
              alt="Website icon"
              className={styles.icon}
            />
          </Link>
        </nav>
      </header>
    </>
  );
}
