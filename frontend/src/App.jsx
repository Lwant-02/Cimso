import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AppLayout } from "./components/UI/AppLayout";

export const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};
