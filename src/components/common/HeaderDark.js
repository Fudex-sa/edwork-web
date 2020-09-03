import React, { Component } from 'react';
import styles from './styles/header.module.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import UserPlanText from './UserPlanText';
import moment from 'moment';

// Assets
import LogoWhiteBlue from '~assets/imgs/logo_white_blue.svg';
import GiftIcon from '~assets/imgs/gift.svg';

// Actions
import logout from '../../containers/Auth/actions/logout';

const LoginView = ({ actions, userData, t }) => {
  const isProUser = userData.Company?.plan;
  const startPlan = userData.Company?.plan_started_at;
  const endPlan = userData.Company?.plan_finished_at;

  return (
    <div className={styles.actions}>
      <div className={styles.plan_wrapper}>
        <UserPlanText
          isPro={isProUser}
          expireDays={moment(endPlan).diff(startPlan, 'days')}
        />
      </div>

      {/* <div className={styles.balance}>
        <span className={styles.icon}>
          <img src={GiftIcon} alt="gift icon" />
        </span>
        <div className={styles.info}>
          <p>Gift Balance</p>
          <p className={styles.balance_text}>0 SAR</p>
        </div>
      </div> */}

      <a href="#logout" className={styles.logout} onClick={actions.logout}>
        {t('button.logout')}
      </a>
    </div>
  );
};

class HeaderDark extends Component {
  logout = (e) => {
    const { userActions } = this.props;
    e.preventDefault();
    userActions.logout();
  };

  render() {
    const { userData, t } = this.props;
    const hasRegistration =
      window.location.pathname.indexOf('/registration') !== -1;

    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <a href="/" className={styles.logo}>
              <img src={LogoWhiteBlue} alt="logo" />
            </a>
          </div>
          <div className={styles.nav_container}>
            {userData ? (
              <LoginView
                userData={userData}
                actions={{
                  logout: this.logout,
                }}
                t={t}
              />
            ) : (
              <div>
                {!userData && (
                  <span className={styles.spec_text}>
                    {/* Registration is coming soon */}
                    {hasRegistration
                      ? t('header.have_account')
                      : t('heder.dont_have_account')}
                  </span>
                )}
                <NavLink
                  className={styles.button_nav}
                  to={hasRegistration ? '/login' : '/registration'}
                >
                  {hasRegistration
                    ? t('header.login')
                    : t('header.registration')}
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators({ logout }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(HeaderDark));
