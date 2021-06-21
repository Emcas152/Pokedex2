import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import Dpokemon from "views/DPokemon";
import Regiones from  "views/Regiones";
import DRegion from "views/DRegion"
import Pokemon from "./views/Pokemon";
import Items from "./views/Items";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/LandingPage" render={(props) => <Index {...props} />} />
      <Route
        path="/Pokemon"
        render={(props) => <Pokemon {...props} />}
      />
      <Route
        path="/Detalles-Pokemon"
        render={(props) => <Dpokemon {...props} />}
      />
      <Route
          path="/Detalles-Region"
          render={(props) => <DRegion {...props} />}
      />
      <Route
        path="/Regiones"
        render={(props) => <Regiones {...props} />}
      />
      <Route
          path="/Items"
          render={(props) => <Items {...props} />}
      />
      <Redirect from="/" to="/LandingPage" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
