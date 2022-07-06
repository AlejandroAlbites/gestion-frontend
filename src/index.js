import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import reportWebVitals from "./reportWebVitals";
import { DragAndDrop } from "./components/DragAndDrop";
import { DragAndDropStatus } from "./components/DragAndDropStatus";
import { DragAndDrop1 } from "./components/DragAndDrop-1";
import { DragAndDropGroups } from "./components/PruebaDragAndDrop/DragAndDropGroups";
import { CursoDND } from "./components/CursoDND";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <DragAndDrop />
  // <DragAndDropStatus />
  // <DragAndDrop1 />
  // <DragAndDropGroups />
  <CursoDND />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
