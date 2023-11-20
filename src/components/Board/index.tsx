import { MENU_ITEMS } from "@/constant";
import { RootState } from "@/types";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";
const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldDraw = useRef<boolean>(false);
  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: RootState) => state.menu
  );
  const { color, size } = useSelector(
    (state: RootState) => state.toolbox[activeMenuItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const existingContent = new Image();
      existingContent.src = canvas.toDataURL();

      context!.fillStyle = "#fff";
      context!.fillRect(0, 0, canvas.width, canvas.height);

      existingContent.onload = () => {
        context!.drawImage(existingContent, 0, 0);

        const URL = canvas.toDataURL();
        const anchor = document.createElement("a");
        anchor.href = URL;
        anchor.download = "sketch.jpg";
        anchor.click();

        context!.fillStyle = "#fff";
        context!.fillRect(0, 0, canvas.width, canvas.height);

        dispatch(actionItemClick(null));
      };
    }
  }, [actionMenuItem, color, dispatch, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context!.strokeStyle = color;
      context!.lineWidth = size;
    };

    changeConfig();
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "#fff";

    const beginPath = (x: number, y: number) => {
      context!.beginPath();
      context!.moveTo(x, y);
    };
    const drawLine = (x: number, y: number) => {
      context!.lineTo(x, y);
      context!.stroke();
    };
    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      shouldDraw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  console.log(color, size);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
