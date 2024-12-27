import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import IpAddressProvider from "./ContextApi/IpAddressProvider.jsx";

createRoot(document.getElementById("root")).render(
  <IpAddressProvider>
    <App />
  </IpAddressProvider>
);
