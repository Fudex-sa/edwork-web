import React from "react";
import { connect } from "react-redux";
import { replace } from "react-router-redux";
import { clearSession } from "~helpers/session";
import LoadingWrapper from "~components/common/LoadingWrapper";

export default function requireAuth(Component, LayoutComponent) {
  class PremimumComponent extends React.Component {
    componentWillMount = () => {
      this.checkAuth(this.props);
    };

    componentWillReceiveProps = (nextProps) => {
      this.checkAuth(nextProps);
    };

    checkAuth = (props) => {
      const { authenticated, authenticating } = props;
      if (!authenticating && !authenticated) {
        props.history.push("/login");
        clearSession();
      }
    };

    render() {
      const { authenticating, authenticated, ...otherProps } = this.props;
      return authenticating ? (
        <div className="loading-container">
          <LoadingWrapper isLoading />
        </div>
      ) : (
        <LayoutComponent {...otherProps} component={Component} />
      );
    }
  }

  const mapStateToProps = (store) => ({
    authenticating: store.auth.authenticating,
    authenticated: store.auth.authenticated,
  });

  return connect(mapStateToProps, { replace })(PremimumComponent);
}
