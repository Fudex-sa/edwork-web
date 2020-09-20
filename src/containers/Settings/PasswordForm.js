import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify } from 'antd';
import { withNamespaces } from 'react-i18next';

// Styles
import settingsStyles from './styles/settings.module.scss';
import styles from '~containers/Registration/styles/step.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import { Input, Button } from '~components/forms';

// Actions
import updateUserData from './actions/updateUserData';

class PasswordForm extends Component {
  state = {
    password: '',
    rePassword: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { settingsActions, userData } = this.props;
    const { password, rePassword } = this.state;

    if (password.length <= 5) {
      notify.error(`Password should be minimum 6 characters`);
      return;
    }

    if (password !== rePassword || password.length === 0) {
      notify.error(`Passwords not same`);
      return;
    }

    settingsActions.updateUserData(
      {
        id: userData.id,
        password,
      },
      {
        success: (response) => {
          const { message } = response;
          notify.success(message);
          this.setState({
            password: '',
            rePassword: '',
          });
        },
        fail: (response) => {
          const { message } = response;
          notify.error(message);
        },
      }
    );
  };

  render() {
    const { accoundDataUpdateLoading, t } = this.props;
    const { password, rePassword } = this.state;
    return (
      <div>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <div className={inputStyles.input_container}>
            <Input
              type="password"
              value={password}
              label={t('input.password.label')}
              placeholder={t('input.password.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  password: target.value,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              type="password"
              value={rePassword}
              label={t('input.re_password.label')}
              placeholder={t('input.re_password.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  rePassword: target.value,
                });
              }}
            />
          </div>

          <div className={settingsStyles.button_wrapper}>
            <Button
              type="submit"
              isLoading={accoundDataUpdateLoading}
              text={t('button.update')}
              size="large"
              fullWidth
              onClick={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  accoundDataUpdateLoading: store.settings.accoundDataUpdateLoading,
});

const mapDispatchToProps = (dispatch) => ({
  settingsActions: bindActionCreators({ updateUserData }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(PasswordForm));
