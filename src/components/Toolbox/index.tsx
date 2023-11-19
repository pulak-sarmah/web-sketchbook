import React from "react";
import styles from "./index.module.css";
import { COLORS } from "@/constant";

const updateBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {};

const ToolBox = () => {
  return (
    <div className={styles.toolboxContainer}>
      <div className={styles.toolItem}>
        <h4 className={styles.toolTetx}>Stroke Color</h4>
        <div className={styles.itemContainer}>
          <div
            className={styles.colorBox}
            style={{ backgroundColor: COLORS.BLACK }}
          />
          <div
            className={styles.colorBox}
            style={{ backgroundColor: COLORS.RED }}
          />

          <div
            className={styles.colorBox}
            style={{ backgroundColor: COLORS.ORANGE }}
          />

          <div
            className={styles.colorBox}
            style={{ backgroundColor: COLORS.YELLOW }}
          />
          <div
            className={styles.colorBox}
            style={{ backgroundColor: COLORS.GREEN }}
          />
          <div
            className={styles.colorBox}
            style={{ backgroundColor: COLORS.BLUE }}
          />
        </div>
      </div>

      <div className={styles.toolItem}>
        <h4 className={styles.toolTetx}>Brush Size</h4>
        <div className={styles.itemContainer}>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            onChange={updateBrushSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
