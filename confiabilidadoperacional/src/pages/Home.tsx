import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Bienvenido a Confiabilidad Operacional</h1>
      <p className={styles.description}>
        Esta es la página principal de nuestro sitio web dedicado a la
        confiabilidad operacional. Aquí encontrarás información sobre procesos,
        técnicas y mejores prácticas para mejorar la eficiencia y seguridad en
        operaciones industriales.
      </p>
      <div className={styles.sections}>
        <section className={styles.section}>
          <h2>Nuestros Servicios</h2>
          <p>
            Ofrecemos consultoría especializada en confiabilidad operacional,
            análisis de riesgos y optimización de procesos.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Artículos Técnicos</h2>
          <p>
            Explora nuestros artículos sobre HAZOP, LOPA, análisis de capas de
            protección y más temas relacionados.
          </p>
        </section>
        <section className={styles.section}>
          <h2>Contacto</h2>
          <p>
            Ponte en contacto con nosotros para más información sobre nuestros
            servicios y proyectos.
          </p>
        </section>
      </div>
    </div>
  );
}
