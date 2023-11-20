import React, { useState } from "react";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/types";
import { changeColor, changeBrushSize } from "@/slice/toolboxSlice";
import cx from "classnames";

const ToolBox = () => {
  const [showToolbox, setShowToolbox] = useState(false);
  const [currentSize, setCurrentSize] = useState(3);

  const dispatch = useDispatch();
  const activeMenuItem = useSelector(
    (state: RootState) => state.menu.activeMenuItem
  );
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.ERASER || MENU_ITEMS.PENCIL;

  const { color } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem]
  );

  const updateBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSize(+e.target.value);
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };

  const updateColor = (newColor: string) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };

  const handleToolbox = () => {
    setShowToolbox(!showToolbox);
  };

  const handleColorBoxClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains(styles.colorBox)) {
      const clickedColor = target.style.backgroundColor;
      updateColor(clickedColor);
    }
  };

  return showToolbox ? (
    <div className={styles.toolboxContainer}>
      <div
        className={
          showStrokeToolOption
            ? styles.toolboxIconLeftAll
            : styles.toolboxIconLeftBrush
        }
      >
        <FontAwesomeIcon
          icon={faCircleLeft}
          style={{ fontSize: "24px" }}
          onClick={handleToolbox}
          onMouseOver={(e) => (e.currentTarget.style.color = "#3d3d3d")}
          onMouseOut={(e) => (e.currentTarget.style.color = "black")}
        />
      </div>

      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolTetx}>Stroke Color</h4>
          <div className={styles.itemContainer} onClick={handleColorBoxClick}>
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.GREEN,
              })}
              style={{ backgroundColor: COLORS.GREEN }}
            />
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
            />
          </div>
        </div>
      )}

      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolTetx}>Brush Size </h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={currentSize}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
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
