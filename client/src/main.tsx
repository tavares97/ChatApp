import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fontsource/press-start-2p";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Toaster />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
