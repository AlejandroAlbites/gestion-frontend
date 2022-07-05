import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DragAndDrop } from "./components/DragAndDrop";
import { DragAndDropStatus } from "./components/DragAndDropStatus";
import { DragAndDrop1 } from "./components/DragAndDrop-1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <DragAndDrop />
  <DragAndDropStatus />
  // <DragAndDrop1 />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
