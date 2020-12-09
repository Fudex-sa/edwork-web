import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getInitalPaymentToken from './actions/getInitalPaymentToken';
import LoadingWrapper from '~components/common/LoadingWrapper';

class Pay extends Component {
  state = {
    availabelToken: false,
    error: false,
  };

  componentDidMount() {
    const { getInitalPayment } = this.props;
    const token = sessionStorage.getItem('authToken');
    const data = {
      amount: 10,
      type: 'plan',
    };
    getInitalPayment(data, {
      success: (response) => {
        sessionStorage.setItem('paymentId', response.data.id);
        this.setState(
          {
            availabelToken: true,
            token: response.data.id,
          },
          () => {
            // make script element
            const script = document.createElement('script');
            script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${response.data.id}`;
            script.async = true;
            document.body.appendChild(script);
          }
        );
      },
      fail: (response) => {
        this.setState({
          error: true,
        });
      },
    },
      token
    );
  }

  render() {
    const { availabelToken, error } = this.state;

    const hostName = `${window.location.origin}/check-status`;

    if (error) return <h2>Something wrong!</h2>; //TODO: make retry request after click button
    if (!availabelToken) return <LoadingWrapper isLoading />;
    return (
      <div style={{ margin: '50px' }}>
        {/* TOOD: change redirect url */}
        {/* <span>
          4111111111111111 05/21 cvv2 123 (Success). 5204730000002514 05/22 cvv2
          251 (Fail).
        </span> */}
        <form
          action={hostName}
          className="paymentWidgets"
          data-brands="VISA MASTER AMEX"
        ></form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  getInitalPayment: bindActionCreators(getInitalPaymentToken, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
