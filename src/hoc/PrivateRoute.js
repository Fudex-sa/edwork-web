import React from "react";
import { Route } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import requireAuth from "./requireAuth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    onUpdate={() => window.scrollTo(0, 0)}
    component={requireAuth(Component, AuthLayout)}
  />
);

export default PrivateRoute;
