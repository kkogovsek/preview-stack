import React from "react";
import ReactDom from "react-dom";
import "./base.css";

window.EXCALIDRAW_ASSET_PATH = `/assets/`;

import("./App").then((module) => {
  const App = module.default;
  const container = document.getElementById("root");
  const root = ReactDom.render(<App />, container);
});
