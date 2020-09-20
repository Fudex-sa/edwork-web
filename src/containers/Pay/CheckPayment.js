import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingWrapper from '~components/common/LoadingWrapper';
import checkPayment from './actions/checkPayment';
import { Result } from 'antd';
import { Button } from '~components/forms';
import HeaderDark from '~components/common/HeaderDark';
import checkValidation from '../Auth/actions/checkValidation';

class Pay extends Component {
  state = {
    availabelToken: false,
    error: false,
  };

  goHome = () => {
    const { checkValidationUser } = this.props;
    const token = sessionStorage.getItem('authToken');
    const { origin } = window.location;
    checkValidationUser(
      { token },
      {
        success: (response) => {
          console.warn('success', response);
          // sessionStorage.removeItem('authToken');
          window.location.href = `${origin}/dashboard`;
        },
        fail: (response) => {
          console.warn('error', response);
          this.setState({
            error: true,
          });
        },
      }
    );
  };

  componentDidMount() {
    const { checkPaymentStatus, checkValidationUser } = this.props;

    const paymentId = sessionStorage.getItem('paymentId');
    if (paymentId === null) {
      // TODO: change to error screen
      return;
    }
    const data = {
      payment_id: paymentId,
    };

    setTimeout(() => {
      const token = sessionStorage.getItem('authToken');
      checkPaymentStatus(
        data,
        {
          success: (response) => {
            console.warn('success', response);
            sessionStorage.removeItem('paymentId');
            this.setState({
              availabelToken: true,
            });
          },
          fail: (response) => {
            console.warn('error', response);
            this.setState({
              error: true,
            });
          },
        },
        token
      );
    }, 3000);
  }

  render() {
    const { availabelToken, error } = this.state;
    const token = sessionStorage.getItem('authToken');

    if (error)
      return (
        <Result
          status="warning"
          title="Something wrong!"
          extra={[
            <Button text="Go to home" onClick={() => this.goHome(token)} />,
          ]}
        />
      ); //TODO: make retry request after click button
    if (!availabelToken) return <LoadingWrapper isLoading />;
    return (
      <>
        <HeaderDark />
        <Result
          status="success"
          title="Successfully payment!"
          extra={[
            <Button
              text={token ? 'Go to dashboard' : 'Go to home'}
              onClick={() => this.goHome(token)}
            />,
          ]}
        />
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  checkPaymentStatus: bindActionCreators(checkPayment, dispatch),
  checkValidationUser: bindActionCreators(checkValidation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
