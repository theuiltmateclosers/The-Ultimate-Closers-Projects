import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Handle GitHub Pages SPA redirect (restores client-side route after 404 redirect)
if (typeof window !== "undefined") {
  const pendingRedirect = sessionStorage.getItem("gh:redirect");
  if (pendingRedirect) {
    sessionStorage.removeItem("gh:redirect");
    const current = window.location.pathname + window.location.search + window.location.hash;
    if (!current || current === "/" || current === "/index.html") {
      window.history.replaceState(null, "", pendingRedirect);
    }
  }
}