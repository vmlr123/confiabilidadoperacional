import RMSelectFile from "./RMSelectFile";
import { useState } from "react";
import styles from "./RiskMatrixesFromFile.module.css";
export default function RiskMatrixesFromFiles() {
  const [message, setMessage] = useState<string>("");
  const [matrixData, setMatrixData] = useState<Record<string, unknown>[]>([]);

  return (
    <>
      <div className={styles.RMsFromFile}>
        <RMSelectFile setMessage={setMessage} setMatrixData={setMatrixData} />
        <div className={styles.matrixesFromFile}>
          {message && <h3>{message}</h3>}
          <pre>{JSON.stringify(matrixData, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
