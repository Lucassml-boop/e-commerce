import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // Importar o AuthProvider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider> {/* Envolver o App com AuthProvider */}
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);