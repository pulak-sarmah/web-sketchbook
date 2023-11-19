import React, { useState } from "react";
import styles from "./index.module.css";
import { COLORS } from "@/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";

const updateBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {};

const ToolBox = () => {
  const [showToolbox, setShowToolbox] = useState(false);

  const handleToolbox = () => {
    setShowToolbox(!showToolbox);
  };

  return showToolbox ? (
    <div className={styles.toolboxContainer}>
      <div className={styles.toolboxIconLeft}>
        <FontAwesomeIcon
          icon={faCircleLeft}
          style={{ fontSize: "36px" }}
          onClick={handleToolbox}
          onMouseOver={(e) => (e.currentTarget.style.color = "#3d3d3d")}
          onMouseOut={(e) => (e.currentTarget.style.color = "black")}
        />
      </div>
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
  ) : (
    <div className={styles.toolboxIconRight}>
      <FontAwesomeIcon
        icon={faCircleRight}
        style={{ fontSize: "36px" }}
        onClick={handleToolbox}
        onMouseOver={(e) => (e.currentTarget.style.color = "#3d3d3d")}
        onMouseOut={(e) => (e.currentTarget.style.color = "black")}
      />
    </div>
  );
};

export default ToolBox;
