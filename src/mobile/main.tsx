import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MobileApp from "./MobileApp";
import { initAnalytics } from "../lib/analytics";
import "./mobile.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MobileApp />
  </StrictMode>
);

initAnalytics();
