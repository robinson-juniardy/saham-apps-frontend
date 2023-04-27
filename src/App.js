import React from "react";
import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import PrimeReact from "primereact/api";
import MainRouters from "./components/routes/MainRouters";
import { SnackbarProvider } from "notistack";

PrimeReact.autoZIndex = true;

const App = () => {
  return (
    <SnackbarProvider maxSnack={10}>
      <MainRouters />
    </SnackbarProvider>
  );
};

export default App;
