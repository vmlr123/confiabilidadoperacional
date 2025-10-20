export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontSize: "1.1rem",
      }}
    >
      Cargando contenido...
    </div>
  );
}
