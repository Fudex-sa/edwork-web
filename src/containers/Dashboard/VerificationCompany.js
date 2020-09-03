import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StepWizard from 'react-step-wizard';

// Styles
import styles from './styles/verification.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import HeaderDark from '~components/common/HeaderDark';
import { FormWrapper, Input, Button } from '~components/forms';
import SmsCode from '~components/forms/input/SmsCode';
import PhoneVerification from './verificaitonSteps/PhoneVerification';
import ProofingDocuments from './verificaitonSteps/ProofingDocuments';

class VerificationCompany extends Component {
  state = {
    phone: '',
  };

  handleChangeState = (obj) => {
    this.setState(obj);
  };

  onSubmit = () => {
    const { history, authActions } = this.props;
    authActions.forgetPassword(this.state, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  render() {
    const { forgetPasswordLoading, history } = this.props;
    const { email } = this.state;
    return (
      <div>
        <HeaderDark />

        <div className={styles.container}>
          <StepWizard>
            <PhoneVerification onChangeState={this.handleChangeState} />
            <ProofingDocuments history={history} />
          </StepWizard>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  forgetPasswordLoading: store.user.forgetPasswordLoading,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationCompany);
