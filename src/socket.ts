import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://web-sketchbook-server.onrender.com"
    : "http://localhost:8001";
export const socket = io(URL);
