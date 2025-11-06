import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.withCredentials = true;

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
