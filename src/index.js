import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./Redux/Store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./ThemeContext/ThemeProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
