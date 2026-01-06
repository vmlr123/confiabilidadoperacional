import styles from "./RiskMatrixPage.module.css";
import React, { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import type { OverlayChildren } from "react-bootstrap/Overlay";
import RiskMatrixesFromFile from "./RiskMatrixesFromFile";

export default function RiskMatrix() {
  //Risks go from 1 to 5
  // 1: Very Low
  // 2: Low
  // 3: Medium
  // 4: High
  // 5: Very High
  // Each risk is represented as [impact, likelihood] (x, y)
  const [risk1, setRisk1] = useState<number[]>([4, 2]);
  const [risk2, setRisk2] = useState<number[]>([3, 1]);
  const [risk3, setRisk3] = useState<number[]>([5, 3]);
  const [risk4, setRisk4] = useState<number[]>([1, 2]);

  // Helper for focus navigation and CSV export
  function focusCell(x: number, y: number) {
    const el = document.querySelector(
      `button[data-x="${x}"][data-y="${y}"]`
    ) as HTMLButtonElement | null;
    if (el) el.focus();
  }

  function handleCellKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    x: number,
    y: number
  ) {
    const key = e.key;
    if (key === "ArrowRight") {
      e.preventDefault();
      focusCell(Math.min(5, x + 1), y);
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      focusCell(Math.max(1, x - 1), y);
    } else if (key === "ArrowUp") {
      e.preventDefault();
      focusCell(x, Math.min(5, y + 1));
    } else if (key === "ArrowDown") {
      e.preventDefault();
      focusCell(x, Math.max(1, y - 1));
    }
  }
  function resetMatrix() {
    setRisk1([4, 2]);
    setRisk2([3, 1]);
    setRisk3([5, 3]);
    setRisk4([1, 2]);
  }

  function getRiskNumber(impact: number, likelihood: number): number {
    let riskNumber: number = 0;
    riskNumber =
      impact === risk1[0] && likelihood === risk1[1] ? 1 : riskNumber;
    riskNumber =
      impact === risk2[0] && likelihood === risk2[1] ? 2 : riskNumber;
    riskNumber =
      impact === risk3[0] && likelihood === risk3[1] ? 3 : riskNumber;
    riskNumber =
      impact === risk4[0] && likelihood === risk4[1] ? 4 : riskNumber;
    return riskNumber;
  }
  function getRiskDescription(riskNumber: number): string {
    switch (riskNumber) {
      case 1:
        return "Very Low";
      case 2:
        return "Low";
      case 3:
        return "Medium";
      case 4:
        return "High";
      case 5:
        return "Very High";
      default:
        return "";
    }
  }
  function renderTooltip(x: number, y: number): OverlayChildren {
    const riskNumber: number = getRiskNumber(x, y);
    let currentRisk: number[] = [0, 0];
    if (riskNumber === 0) {
      currentRisk = [0, 0];
    } else if (riskNumber === 1) {
      currentRisk = [...risk1];
    } else if (riskNumber === 2) {
      currentRisk = [...risk2];
    } else if (riskNumber === 3) {
      currentRisk = [...risk3];
    } else if (riskNumber === 4) {
      currentRisk = [...risk4];
    }
    return (
      <Tooltip id={`matrix-tooltip-${x}-${y}`}>
        {/*Please fix this line*/}
        Risk {riskNumber}: Impact is {getRiskDescription(currentRisk[0])}.
        Likelihood is {getRiskDescription(currentRisk[1])}.
      </Tooltip>
    );
  }

  function renderCell(x: number, y: number) {
    const riskNumber = getRiskNumber(x, y);
    if (riskNumber === 0) return null;
    const ariaLabel = `matrix cell impact ${x} likelihood ${y} risk number ${riskNumber}`;
    const tooltipId = `matrix-tooltip-${x}-${y}`;
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip(x, y)}
      >
        <Button
          variant="primary"
          className={styles.cellButton}
          data-x={x}
          data-y={y}
          aria-label={ariaLabel}
          aria-describedby={tooltipId}
          role="gridcell"
          aria-selected={riskNumber !== 0}
          onKeyDown={(e) => handleCellKeyDown(e, x, y)}
        >
          {riskNumber}
        </Button>
      </OverlayTrigger>
    );
  }
  return (
    <main className={styles.matrixPage}>
      <div className={styles.manualEntry}>
        <section className={styles.riskCard}>
          <div className={styles.matrixHeader}>
            <h2>Risk Matrix</h2>
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  style={{
                    background:
                      "linear-gradient(180deg, var(--accent-start), var(--accent-mid))",
                  }}
                />{" "}
                Low
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  style={{
                    background: "linear-gradient(180deg, #f59e0b, #f97316)",
                  }}
                />{" "}
                Medium
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  style={{
                    background: "linear-gradient(180deg, #ef4444, #dc2626)",
                  }}
                />{" "}
                High
              </div>
            </div>
          </div>
          <div className={styles.matrixInner}>
            <p className={styles.likelihoodText}>Likelihood</p>
            <table
              className={styles.grid}
              role="grid"
              aria-label="Risk matrix grid"
            >
              <tbody>
                <tr>
                  <th className={styles.green}>{renderCell(1, 5)}</th>
                  <th className={styles.orange}>{renderCell(2, 5)}</th>
                  <th className={styles.red}>{renderCell(3, 5)}</th>
                  <th className={styles.red}>{renderCell(4, 5)}</th>
                  <th className={styles.red}>{renderCell(5, 5)}</th>
                </tr>
                <tr>
                  <th className={styles.green}>{renderCell(1, 4)}</th>
                  <th className={styles.orange}>{renderCell(2, 4)}</th>
                  <th className={styles.orange}>{renderCell(3, 4)}</th>
                  <th className={styles.red}>{renderCell(4, 4)}</th>
                  <th className={styles.red}>{renderCell(5, 4)}</th>
                </tr>
                <tr>
                  <th className={styles.green}>{renderCell(1, 3)}</th>
                  <th className={styles.orange}>{renderCell(2, 3)}</th>
                  <th className={styles.orange}>{renderCell(3, 3)}</th>
                  <th className={styles.red}>{renderCell(4, 3)}</th>
                  <th className={styles.red}>{renderCell(5, 3)}</th>
                </tr>
                <tr>
                  <th className={styles.green}>{renderCell(1, 2)}</th>
                  <th className={styles.green}>{renderCell(2, 2)}</th>
                  <th className={styles.orange}>{renderCell(3, 2)}</th>
                  <th className={styles.orange}>{renderCell(4, 2)}</th>
                  <th className={styles.red}>{renderCell(5, 2)}</th>
                </tr>
                <tr>
                  <th className={styles.green}>{renderCell(1, 1)}</th>
                  <th className={styles.green}>{renderCell(2, 1)}</th>
                  <th className={styles.green}>{renderCell(3, 1)}</th>
                  <th className={styles.green}>{renderCell(4, 1)}</th>
                  <th className={styles.orange}>{renderCell(5, 1)}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.impactText}>Impact</p>
        </section>
        <aside className={styles.controls}>
          <div className={styles.actionBar}>
            <Button
              onClick={resetMatrix}
              variant="outline-secondary"
              size="sm"
              className={styles.resetButton}
            >
              Reset
            </Button>
          </div>
          <div className={styles.riskOptions}>
            <div className={styles.riskSelectors}>
              <h3>Risk 1: </h3>
              <div className={styles.riskOne}>
                <p>Impact</p>
                <select
                  value={risk1[0]}
                  onChange={(e) => setRisk1([Number(e.target.value), risk1[1]])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
                <p>Likelihood</p>
                <select
                  value={risk1[1]}
                  onChange={(e) => setRisk1([risk1[0], Number(e.target.value)])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
              </div>
              <h3>Risk 2: </h3>
              <div className={styles.riskTwo}>
                <p>Impact</p>
                <select
                  value={risk2[0]}
                  onChange={(e) => setRisk2([Number(e.target.value), risk2[1]])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
                <p>Likelihood</p>
                <select
                  value={risk2[1]}
                  onChange={(e) => setRisk2([risk2[0], Number(e.target.value)])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
              </div>
              <h3>Risk 3: </h3>
              <div className={styles.riskThree}>
                <p>Impact</p>
                <select
                  value={risk3[0]}
                  onChange={(e) => setRisk3([Number(e.target.value), risk3[1]])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
                <p>Likelihood</p>
                <select
                  value={risk3[1]}
                  onChange={(e) => setRisk3([risk3[0], Number(e.target.value)])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
              </div>
              <h3>Risk 4: </h3>
              <div className={styles.riskFour}>
                <p>Impact</p>
                <select
                  value={risk4[0]}
                  onChange={(e) => setRisk4([Number(e.target.value), risk4[1]])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
                <p>Likelihood</p>
                <select
                  value={risk4[1]}
                  onChange={(e) => setRisk4([risk4[0], Number(e.target.value)])}
                >
                  <option value={1}>Very Low</option>
                  <option value={2}>Low</option>
                  <option value={3}>Medium</option>
                  <option value={4}>High</option>
                  <option value={5}>Very High</option>
                </select>
              </div>
            </div>
            <div className={styles.summary}>
              <h4>Summary</h4>
              <ul>
                <li>
                  Risk 1: Impact {getRiskDescription(risk1[0])}, Likelihood{" "}
                  {getRiskDescription(risk1[1])}
                </li>
                <li>
                  Risk 2: Impact {getRiskDescription(risk2[0])}, Likelihood{" "}
                  {getRiskDescription(risk2[1])}
                </li>
                <li>
                  Risk 3: Impact {getRiskDescription(risk3[0])}, Likelihood{" "}
                  {getRiskDescription(risk3[1])}
                </li>
                <li>
                  Risk 4: Impact {getRiskDescription(risk4[0])}, Likelihood{" "}
                  {getRiskDescription(risk4[1])}
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
      <RiskMatrixesFromFile />
    </main>
  );
}
