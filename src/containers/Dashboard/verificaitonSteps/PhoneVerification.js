import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import SmsCode from '~components/forms/input/SmsCode';
import { Input, Button, FormWrapper } from '~components/forms';
import { withNamespaces } from 'react-i18next';
import { message as notify } from 'antd';

// styles
import styles from '../styles/verification.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';
import SmsCode from '~components/forms/input/SmsCode';
import sendSmsCode from '../actions/sendSmsCode';
import checkSmsCode from '../actions/checkSmsCode';
import TimerWrapper from '~components/common/TimerWrapper';

class PhoneVerification extends Component {
  state = {
    phone: '',
    code: '',
    showSmsCode: false,
    sendAgain: false,
  };

  timerRef = null;

  handleSendSmsCode = (isSendAgain) => {
    const { smsActions } = this.props;
    const { phone } = this.state;

    if (isSendAgain) {
      this.setState({
        sendAgain: true,
      });
      if (this.timerRef) {
        this.timerRef.onUpdateTimer();
      }
    }

    const data = {
      mobile: phone,
    };

    smsActions.sendSmsCode(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);

        this.setState({
          showSmsCode: true,
        });
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  handleCheckCode = (code) => {
    const { smsActions, nextStep, onChangeState } = this.props;
    const { phone } = this.state;

    const data = {
      mobile: phone,
      code,
    };

    smsActions.sendSmsCode(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
        onChangeState({ phone });
        nextStep();
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  render() {
    const { phone, code, showSmsCode, sendAgain } = this.state;
    const {
      t,
      isSmsCodeSendLoading,
      isSmsCodeVerificationLoading,
    } = this.props;
    return (
      <FormWrapper title={t('verify.verify_mobile_title')}>
        {showSmsCode ? (
          <>
            <div className={[inputStyles.input_container, styles.sms_code]}>
              <SmsCode
                onComplete={(value) => {
                  this.setState({ code: value }, () => {
                    this.handleCheckCode(value);
                  });
                }}
              />

              <TimerWrapper
                ref={(timerRef) => (this.timerRef = timerRef)}
                isActive={sendAgain}
                onFinished={() => {
                  this.setState({
                    sendAgain: false,
                  });
                }}
              >
                <div className={styles.re_send}>
                  <button
                    type="button"
                    onClick={() => this.handleSendSmsCode(true)}
                  >
                    <FontAwesomeIcon icon={['fas', 'undo-alt']} />
                    {t('button.send_again')}
                  </button>
                </div>
              </TimerWrapper>
            </div>

            <div className={styles.button_wrapper}>
              <Button
                isLoading={isSmsCodeVerificationLoading}
                text={t('button.next')}
                size="large"
                fullWidth
                onClick={() => this.handleCheckCode(code)}
              />
            </div>
          </>
        ) : (
          <>
            <div className={inputStyles.input_container}>
              <Input
                type="phone"
                value={phone}
                label={t('input.mobile_number_for_smscode.label')}
                placeholder={t('input.mobile_number_for_smscode.placeholder')}
                onChange={({ target }) =>
                  this.setState({
                    phone: target.value,
                  })
                }
              />
            </div>

            <div className={styles.button_wrapper}>
              <Button
                isLoading={isSmsCodeSendLoading}
                text={t('button.send_code')}
                size="large"
                fullWidth
                onClick={() => this.handleSendSmsCode()}
              />
            </div>
          </>
        )}
      </FormWrapper>
    );
  }
}

const mapStateToProps = (store) => ({
  isSmsCodeSendLoading: store.dashboard.isSmsCodeSendLoading,
  isSmsCodeVerificationLoading: store.dashboard.isSmsCodeVerificationLoading,
});

const mapDispatchToProps = (dispatch) => ({
  smsActions: bindActionCreators({ sendSmsCode, checkSmsCode }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(PhoneVerification));
