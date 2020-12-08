import React, { Component } from 'react';
import styles from './styles/settings.module.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';

import { Button } from '~components/forms';
import Pay from '../Pay/Pay';
import moment from 'moment';

class MembershipForm extends Component {
  state = { showPay: false };

  showPayment = () => {
    this.setState({ showPay: true });
  };

  render() {
    const { showPay } = this.state;
    const { userData, t } = this.props;
    const isProUser = userData.Company?.plan;
    const startPlan = userData.Company?.plan_started_at;
    const endPlan = userData.Company?.plan_finished_at;

    // console.warn(startPlan, endPlan);

    if (showPay) return <Pay />;
    return (
      <div>
        <div className={styles.membership_content}>
          <p className={styles.title}>
            {t('settings.current_membership_text')}:
            <br/><span>
              {isProUser
                ? t('settings.membership.pro')
                : t('settings.membership.free')}
            </span>
          </p>
          <div className={styles.button_wrapper}>
            {isProUser ? (
              <>
                <Button
                  text="Extend subsicription"
                  // size="large"
                  onClick={() => {
                    this.showPayment();
                  }}
                />
                <p className={styles.extend_time}>
                  {moment(endPlan).diff(startPlan, 'days')} days left
                  {/* 11 month and 5 days left */}
                </p>
              </>
            ) : (
              <>
                <Button
                  text={t('button.buy_now')}
                  size="large"
                  onClick={() => {
                    const { history } = this.props;
                    // history.push('/pay');
                    this.showPayment();
                  }}
                />
                <Button
                  text={t('button.see_features')}
                  size="large"
                  ghost
                  onClick={() => {
                    const { history } = this.props;
                    history.push('/plans');
                  }}
                />
              </>
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

export default connect(mapStateToProps)(
  withRouter(withNamespaces()(MembershipForm))
);
