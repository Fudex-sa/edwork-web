import React, { Component } from 'react';
import styles from './styles/header.module.scss';
import { withRouter } from 'react-router';
import { withNamespaces } from 'react-i18next';

class UserPlanText extends Component {
  goToPay = () => {
    const { history } = this.props;
    console.warn(history);
    history.push('/registration/plan');
  };

  render() {
    const { expireHide, isPro, expireDays = 0, text, t } = this.props;

    if (text)
      return (
        <div className={styles.profile_status}>
          <p className={styles.status}>{text}</p>
        </div>
      );

    return (
      <div
        className={styles.profile_status}
        onClick={() => {
          if (!isPro) this.goToPay();
        }}
      >
        <p className={styles.status}>
          {isPro ? t('settings.membership.pro') : t('settings.membership.free')}
        </p>
        {!expireHide && (
          <span>
            {isPro
              ? t('dashboard.pro_account_expire_date', {
                  expireDays: expireDays,
                })
              : t('dashboard.click_to_buy')}
          </span>
        )}
      </div>
    );
  }
}

export default withNamespaces()(withRouter(UserPlanText));
