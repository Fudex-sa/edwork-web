import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify } from 'antd';
import { withNamespaces } from 'react-i18next';

// Styles
import styles from './styles/login.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import HeaderDark from '~components/common/HeaderDark';
import { FormWrapper, Input, Button } from '~components/forms';
import forgetPassword from './actions/forgetPassword';

class ForgetPassword extends Component {
  state = {
    email: '',
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
    const { forgetPasswordLoading, t } = this.props;
    const { email } = this.state;
    return (
      <div>
        <HeaderDark />

        <div className={styles.container}>
          <FormWrapper title={t('forget_password.title')}>
            <div className={inputStyles.input_container}>
              <Input
                type="email"
                value={email}
                label={t('input.email.label')}
                placeholder={t('input.email.placeholder')}
                onChange={({ target }) =>
                  this.setState({
                    email: target.value,
                  })
                }
              />
            </div>

            <div className={styles.button_wrapper}>
              <Button
                isLoading={forgetPasswordLoading}
                text={t('button.reset')}
                size="large"
                fullWidth
                onClick={this.onSubmit}
              />
            </div>
          </FormWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  forgetPasswordLoading: store.user.forgetPasswordLoading,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators({ forgetPassword }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(ForgetPassword));
