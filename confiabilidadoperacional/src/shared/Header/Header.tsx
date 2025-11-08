import styles from "./Header.module.css";

export default function Header({
  isMenuClicked,
  setIsMenuClicked,
  isLoadingPages,
}: {
  isMenuClicked: boolean;
  setIsMenuClicked: (value: boolean) => void;
  isLoadingPages: boolean;
}) {
  return (
    <>
      <header className={styles.header}>
        {isLoadingPages ? null : (
          <a onClick={() => setIsMenuClicked(!isMenuClicked)}>Menú</a>
        )}
        <h1 className={styles.page}>Confiabilidad Operacional</h1>
      </header>
    </>
  );
}
