// index.js or main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";  
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from "react-router-dom";      
import store, { persistor } from "./redux/store";              
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>  
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
