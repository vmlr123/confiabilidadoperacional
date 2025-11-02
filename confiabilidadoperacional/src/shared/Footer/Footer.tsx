import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>
        © {currentYear} Desarrollado por Víctor Manuel Lameda Rojas. Artículos
        escritos por Víctor Humberto Lameda Barreno. Todos los derechos
        reservados.
      </p>
    </footer>
  );
}
