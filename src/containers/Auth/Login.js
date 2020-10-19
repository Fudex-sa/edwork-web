import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify, Button as ButtonAnt } from 'antd';

import { withNamespaces } from 'react-i18next';
import { languageOptions } from '~configs/languageOptions';

// Styles
import styles from './styles/login.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import HeaderDark from '~components/common/HeaderDark';
import { FormWrapper, Input, Button } from '~components/forms';

// Actions
import authCompany from './actions/authCompany';
import { NavLink } from 'react-router-dom';
import { setLocale } from '~helpers/locale/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChangeRoute = (routeName) => {
    const { history } = this.props;
    history.push(routeName);
  };

  onSubmit = () => {
    const { history, authActions } = this.props;
    authActions.authCompany(this.state, {
      success: (response) => {
        history.replace('/dashboard');
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  changeLang = (lang) => {
    const { languageActions } = this.props;
    languageActions.setLocale(lang);
  };

  render() {
    const { authLoading, t, lang } = this.props;
    const { email, password } = this.state;
    return (
      <div>
        <HeaderDark />

        <div className={styles.language_switcher}>
          <span
            role="button"
            onClick={() => {
              if (lang === languageOptions[0].value) {
                // if lang = eng
                this.changeLang(languageOptions[1].value); // change to arabic
              } else {
                this.changeLang(languageOptions[0].value); // else change to english
              }
            }}
          >
            {lang === 'en'
              ? languageOptions[1].label
              : languageOptions[0].label}
          </span>
        </div>

        <div className={styles.container}>
          <FormWrapper>
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

            <div className={styles.button_wrapper}>
              <Button
                isLoading={authLoading}
                fullWidth
                type="submit"
                text={t('button.login')}
                size="large"
                onClick={this.onSubmit}
              />
              <NavLink className={styles.forget_password} to="/forget-password">
                {t('login.forget_password')}
              </NavLink>
            </div>
          </FormWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  authLoading: store.auth.authLoading,
  lang: store.locale.lang,
});

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators({ authCompany }, dispatch),
  languageActions: bindActionCreators({ setLocale }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Login));
