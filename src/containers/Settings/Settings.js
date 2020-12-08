import React, { Component } from 'react';
import styles from './styles/settings.module.scss';
import { Tabs } from 'antd';
import { withNamespaces } from 'react-i18next';

// Components
import HeaderDark from '~components/common/HeaderDark';
import CompanyForm from './CompanyForm';
import UserFrom from './UserForm';
import PasswordForm from './PasswordForm';
import MembershipForm from './MembershipForm';

const { TabPane } = Tabs;

class Settings extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <HeaderDark />

        <div className={styles.head}>{/* <h1>Settings</h1> */}</div>

        <div className={styles.container}>
          <Tabs tabPosition={'left'}>
            <TabPane tab={t('settings.menu.membership')} key="1" style={{backgroundColor:'#fff'}} >
              <MembershipForm />
            </TabPane>
            <TabPane tab={t('settings.menu.company_profile')} key="2"  style={{backgroundColor:'#fff'}}>
              <CompanyForm />
            </TabPane>
            <TabPane tab={t('settings.menu.user_profile')} key="3" style={{backgroundColor:'#fff'}}>
              <UserFrom />
            </TabPane>
            <TabPane tab={t('settings.menu.password')} key="4" style={{backgroundColor:'#fff'}}>
              <PasswordForm />
            </TabPane>
            {/* <TabPane tab="Payment method" key="6">
              <span>Payment method</span>
            </TabPane>
            <TabPane tab="Invoices" key="7">
              <span>Invoices</span>
            </TabPane> */}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Settings);