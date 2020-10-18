import React from "react";
import { Route } from "react-router-dom";
import { replace } from "react-router-redux";
import { connect } from "react-redux";
import LoadingWrapper from "~components/common/LoadingWrapper";
// import publicHoc from "./publicHoc";

const LoadingAuth = ({ authenticating, children }) =>
  authenticating ? (
    <div className="loadin-container">
      {/* <div className={classnames("loading", {})} />  */}
      {/* loading... */}
      <LoadingWrapper isLoading />
    </div>
  ) : (
    children
  );

class PublicRoute extends React.Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { authenticated, redirectToPage } = this.props;
    if (prevProps.authenticated !== authenticated) {
      console.log('-============================================')
      redirectToPage("/dashboard");
    }
  };

  render() {
    const { component: Component, authenticating } = this.props;
    return (
      <LoadingAuth authenticating={authenticating}>
        <Route {...this.props} component={Component} />
      </LoadingAuth>
    );
  }
}

const mapStateToProps = (store) => ({
  authenticated: store.auth.authenticated,
  authenticating: store.auth.authenticating,
  router: store.router,
});

const mapDispatchToProps = (dispatch) => ({
  redirectToPage: (route) => {
    dispatch(replace(route));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoute);
