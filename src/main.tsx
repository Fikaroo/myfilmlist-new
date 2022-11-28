import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./state/store";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
