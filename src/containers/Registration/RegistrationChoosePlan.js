import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withNamespaces } from 'react-i18next';

import styles from './styles/registration.module.scss';

// Components
import HeaderDark from '~components/common/HeaderDark';
import Pay from '../Pay/Pay';

// Actions
import setRegistrationData from './actions/setRegistrationData';

class RegistrationChoosePlan extends Component {
  state = { showPay: false };

  goToDashboard = () => {
    const { history } = this.props;
    history.replace('/dashboard');
  };

  handlePayPlan = () => {
    this.setState({ showPay: true });
  };

  render() {
    const { showPay } = this.state;
    const { t } = this.props;

    if (showPay)
      return (
        <>
          <HeaderDark />
          <Pay />
        </>
      );
    return (
      <div>
        <HeaderDark />
        <div className={styles.choose_plan}>
          <div className={styles.section_params}>
            {[
              t('user_plan.values.posting'),
              t('user_plan.values.period'),
              t('user_plan.values.company_page'),
              t('user_plan.values.co_workers'),
              t('user_plan.values.comment_app'),
              t('user_plan.values.hr_tools'),
            ].map((item, index) => (
              <p className={styles.item} key={index}>
                <Tooltip title="Tooltip">
                  <span className={styles.question}>?</span>
                </Tooltip>
                <span className={styles.text}>{item}</span>
              </p>
            ))}
          </div>
          <div className={styles.section}>
            <span className={styles.title}>
              {t('settings.membership.free')}
            </span>
            <div className={styles.content}>
              <div className={styles.head}>
                <span className={styles.price}>0 SAR</span>
                <span className={styles.per_price}>
                  {t('user_plan.options.free.only_extra')}
                </span>
              </div>
              <div className={styles.item}>
                {/* <CheckOutlined style={{ fontSize: '26px', color: '#22C932' }} /> */}
                <FontAwesomeIcon icon={['fa', 'check']} />
              </div>
              <div className={styles.item}>
                {t('user_plan.options.days', { day: 30 })}
              </div>
              <div className={styles.item}>
                <FontAwesomeIcon icon={['fa', 'times']} />
              </div>
              <div className={styles.item}>
                <FontAwesomeIcon icon={['fa', 'times']} />
              </div>
              <div className={styles.item}>
                <FontAwesomeIcon icon={['fa', 'times']} />
              </div>

              <div className={classnames(styles.item, styles.with_two)}>
                <p>{t('user_plan.options.free.extra_fees')}</p>
                <p style={{ opacity: '.3' }}>
                  {t('user_plan.options.free.price_start', { price: 88 })}
                </p>
              </div>
              <div
                className={styles.button}
                style={{ backgroundColor: '#BCBCBC' }}
                role="button"
                onClick={() => this.goToDashboard()}
              >
                {t('button.current_plan')}
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.title}>{t('settings.membership.pro')}</span>
            <div className={styles.content}>
              <div className={styles.head}>
                <span className={styles.price}>3999 SAR</span>
                <span className={styles.per_price}>
                  {t('user_plan.options.per_year')}
                </span>
              </div>
              <div className={styles.item}>
                <FontAwesomeIcon icon={['fa', 'check']} />
              </div>
              <div className={styles.item}>
                {t('user_plan.options.days', { day: 60 })}
              </div>
              {[0, 1, 2, 3].map((item, index) => (
                <div className={styles.item} key={index}>
                  <FontAwesomeIcon icon={['fa', 'check']} />
                </div>
              ))}
              <div
                className={styles.button}
                onClick={() => this.handlePayPlan()}
              >
                {t('button.choose_plan')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  registrationData: store.registration.registrationData,
});

const mapDispatchToProps = (dispatch) => ({
  registrationActions: bindActionCreators({ setRegistrationData }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(RegistrationChoosePlan));
