import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { CookiesProvider } from "react-cookie";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <UserContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </UserContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
