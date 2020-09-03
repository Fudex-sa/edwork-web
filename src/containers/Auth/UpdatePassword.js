import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify, Button as ButtonAnt, Result } from 'antd';
import { withNamespaces } from 'react-i18next';
import queryString from 'query-string';

// Styles
import styles from './styles/login.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import HeaderDark from '~components/common/HeaderDark';
import { FormWrapper, Input, Button } from '~components/forms';

// Actions
import updatePassword from './actions/updatePassword';

class UpdatePassword extends Component {
  state = {
    password: '',
    rePassword: '',
    successfully: false,
  };

  handleChangeRoute = (routeName) => {
    const { history } = this.props;
    history.replace(routeName);
  };

  onSubmit = () => {
    const { authActions } = this.props;
    const { password, rePassword } = this.state;
    const { search } = window.location;
    const query = queryString.parse(search);
    const data = {
      email: query.user_email,
      activation_code: query.activation_code,
      password,
    };

    if (password.length <= 5) {
      notify.error(`Password should be minimum 6 characters`);
      return;
    }

    if (password !== rePassword || password.length === 0) {
      notify.error(`Passwords not same`);
      return;
    }

    authActions.updatePassword(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
        this.setState({ successfully: true });
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  render() {
    const { updatePasswordLoading, t } = this.props;
    const { password, rePassword, successfully } = this.state;
    const { search } = window.location;
    const query = queryString.parse(search);

    if (!query.activation_code && !query.user_email) {
      return (
        <Result
          title="Your operation has not been executed"
          extra={
            <Button
              text={t('button.goto_main')}
              size="large"
              onClick={() => this.handleChangeRoute('/')}
            />
          }
        />
      );
    }

    return (
      <div>
        <HeaderDark />

        <div className={styles.container}>
          {successfully ? (
            <Result
              status="success"
              title="Your paswoord has been updated successfully"
              extra={[
                <Button
                  text={t('button.goto_login')}
                  size="large"
                  onClick={() => this.handleChangeRoute('/login')}
                />,
              ]}
            />
          ) : (
            <FormWrapper title="Update password">
              <div className={inputStyles.input_container}>
                <Input
                  type="password"
                  value={password}
                  label={t('input.password.label')}
                  placeholder={t('input.password.placeholder')}
                  onChange={({ target }) =>
                    this.setState({
                      password: target.value,
                    })
                  }
                />
              </div>

              <div className={inputStyles.input_container}>
                <Input
                  type="password"
                  value={rePassword}
                  label={t('input.re_password.label')}
                  placeholder={t('input.re_password.placeholder')}
                  onChange={({ target }) =>
                    this.setState({
                      rePassword: target.value,
                    })
                  }
                />
              </div>

              <div className={styles.button_wrapper}>
                <Button
                  isLoading={updatePasswordLoading}
                  text={t('button.update')}
                  size="large"
                  fullWidth
                  onClick={this.onSubmit}
                />
              </div>
            </FormWrapper>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  updatePasswordLoading: store.user.updatePasswordLoading,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators({ updatePassword }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(UpdatePassword));
