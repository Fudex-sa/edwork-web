import React from "react";
import { Route } from "react-router-dom";
// import Layout from '../containers/Layout';

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <>
        {/* <Header /> */}
        {/* <Layout> */}
        <Component {...props} />
        {/* </Layout> */}
      </>
    )}
  />
);
