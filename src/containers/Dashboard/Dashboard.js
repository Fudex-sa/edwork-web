import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withNamespaces } from 'react-i18next';

import styles from './styles/dashboard.module.scss';

// Assets
import JobIcon from '../../assets/imgs/job.svg';
import UserIcon from '../../assets/imgs/user.svg';
import DashboardIcon from '../../assets/imgs/dashboard.svg';
import SettingsIcon from '../../assets/imgs/settings.svg';
import VerifyIcon from '../../assets/imgs/verify_user.svg';

// Components
import HeaderDark from '~components/common/HeaderDark';
import { WelcomeUser, ActivateUser } from '~components/user';
import resendValidation from '../Auth/actions/resendValidation';

import Noavatar from '~assets/imgs/company_noavatar.svg';
import UserPlanText from '../../components/common/UserPlanText';
import VerifyCompany from '~components/user/VerifyCompany';

const proPlanActions = (t) => [
  {
    name: t('dashboard.plan.my_job.name'),
    subName: t('dashboard.plan.my_job.description'),
    redirect: '/jobs',
    icon: JobIcon,
  },
  {
    name: t('dashboard.plan.membership.name'),
    subName: t('dashboard.plan.membership.description'),
    redirect: '/membership',
    icon: UserIcon,
  },
  {
    name: t('dashboard.plan.coworkers.name'),
    subName: t('dashboard.plan.coworkers.description'),
    redirect: '/coworkers',
    icon: DashboardIcon,
  },
  {
    name: t('dashboard.plan.settings.name'),
    subName: t('dashboard.plan.settings.description'),
    redirect: '/settings',
    icon: SettingsIcon,
  },
];

const freePlanActions = (t) => [
  {
    name: t('dashboard.plan.my_job.name'),
    subName: t('dashboard.plan.my_job.description'),
    redirect: '/jobs',
    icon: JobIcon,
  },
  {
    name: t('dashboard.plan.upgrade.name'),
    subName: t('dashboard.plan.upgrade.description'),
    redirect: '/registration/plan',
    // icon: DashboardIcon,
    IconComponent: () => <UserPlanText expireHide text="Profesional" />,
  },
  {
    name: t('dashboard.plan.settings.name'),
    subName: t('dashboard.plan.settings.description'),
    redirect: '/settings',
    icon: SettingsIcon,
  },
];

class Dashboard extends Component {
  handleChangeRoute = (name) => {
    const { history } = this.props;
    history.push(name);
  };

  handleResendEmailValidation = () => {
    const { userActions, userData } = this.props;
    const data = {
      user_id: userData.id,
    };
    userActions.resendValidation(data, {
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

  handleVerifyCompany = () => {
    const { history } = this.props;
    history.push('/verification');
  };

  render() {
    const { resendValidationLoading, userData = {}, t } = this.props;
    const companyData = userData?.Company;
    if (userData === null) return null;
    return (
      <div>
        <HeaderDark />
        <div className={styles.wrapper}>
          <ActivateUser
            status={userData.active}
            isLoading={resendValidationLoading}
            onResend={this.handleResendEmailValidation}
          />
          <VerifyCompany
            status={companyData.verified || !userData.active}
            onClick={this.handleVerifyCompany}
          />
          <div className={styles.company_wrapper}>
            <div className={styles.company_logo}>
              {companyData?.logo_path ? (
                <img src={companyData.logo_path} alt="company logo" />
              ) : (
                <img
                  src={Noavatar}
                  alt="company logo"
                  className={styles.noavatar}
                />
              )}
            </div>
            <p className={styles.company_name}>
              {companyData?.verified && (
                <img src={VerifyIcon} alt="verify-user" />
              )}
              {companyData?.name}
            </p>
            <WelcomeUser user={userData} />
          </div>
          <div className={styles.navigation_wrapper}>
            {(companyData?.plan ? proPlanActions(t) : freePlanActions(t)).map(
              (item, index) => (
                <div
                  className={styles.item}
                  onClick={() => this.handleChangeRoute(item.redirect)}
                >
                  <div className={styles.icon}>
                    <div className={styles.icon_wrapper}>
                      {item.icon && <img src={item.icon} alt="icon" />}
                      {item.IconComponent && <item.IconComponent />}
                    </div>
                    <div className={styles.title}>{item.name}</div>
                    <div className={styles.sub_title}>{item.subName}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footer_wrapper}>
            <div className={styles.left_side}>
              <span className={styles.copyright}>
                {t('landing.footer.copyright')}
              </span>
              <a href="#">{t('landing.footer.links.privacy')}</a>
              <a href="#">{t('landing.footer.links.terms')}</a>
              <a href="#">{t('landing.footer.links.faq')}</a>
              <a href="/my-website">my website</a>
            </div>
            <div className={styles.right_side}>
              <a href="#">
                <FontAwesomeIcon icon={['fab', 'whatsapp']} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={['fab', 'tiktok']} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={['fab', 'linkedin']} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={['fab', 'snapchat-ghost']} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={['fab', 'instagram']} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={['fab', 'telegram-plane']} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  resendValidationLoading: store.user.resendValidationLoading,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators({ resendValidation }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Dashboard));
