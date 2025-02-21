import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContextProvider } from "./assets/context/theme-context.jsx";
import { ToastContainer } from "react-toastify";
// import { AuthProvider } from "./assets/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <ThemeContextProvider>
      <ToastContainer position="top-right"   autoClose={2000} />
      <App />
    </ThemeContextProvider>
    {/* </AuthProvider> */}
  </StrictMode>
);
