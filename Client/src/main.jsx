import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store.jsx";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
)
