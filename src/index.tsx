import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import NotesApp from "./notes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <NotesApp />
  </React.StrictMode>
);
