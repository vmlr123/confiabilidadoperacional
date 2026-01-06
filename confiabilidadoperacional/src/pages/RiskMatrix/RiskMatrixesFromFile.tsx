import RMSelectFile from "./RMSelectFile";
import { useState } from "react";
import styles from "./RiskMatrixesFromFile.module.css";
export default function RiskMatrixesFromFiles() {
  const [file, setFile] = useState<File>();
  const [message, setMessage] = useState<string>("");

  return (
    <>
      <div className={styles.RMsFromFile}>
        <RMSelectFile setFile={setFile} setMessage={setMessage} />
        <div className={styles.matrixesFromFile}>
          {message && <h3>{message}</h3>}
          {/* <p>{file}</p> */}
        </div>
      </div>
    </>
  );
}
