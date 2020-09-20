import React, { Component } from 'react';
import styles from './styles/activateUser.module.scss';
import { Button } from '../forms';
import { withNamespaces } from 'react-i18next';

class ActivateUser extends Component {
  render() {
    const { isLoading, onResend, status, t } = this.props;
    if (status) return null;
    return (
      <div className={styles.container}>
        <p>{t('dashboard.activate_user_email')}</p>
        <div>
          <Button
            isLoading={isLoading}
            onClick={onResend}
            // danger
            text={t('button.resend_email')}
          />
        </div>
      </div>
    );
  }
}

export default withNamespaces()(ActivateUser);
