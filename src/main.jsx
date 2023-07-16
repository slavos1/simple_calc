import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MathJaxProvider } from '@yozora/react-mathjax';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MathJaxProvider>
      <App />
    </MathJaxProvider>
  </React.StrictMode>
);
