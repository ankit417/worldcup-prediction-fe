import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage } from "../screens/home/homePage.screen";

export const App = () => {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
};
