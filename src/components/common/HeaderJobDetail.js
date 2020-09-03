import React, { Component } from 'react';
import styles from './styles/header.module.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import {
  AuditOutlined,
  MailOutlined,
  DownOutlined,
  RedoOutlined,
  FormOutlined,
  UploadOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

// Assets
import Logo from '~assets/imgs/logo_white_blue.svg';

// Actions
import logout from '../../containers/Auth/actions/logout';
import { Dropdown, Button, Menu, Tooltip, Switch } from 'antd';

const Actions = (props) => {
  const { items = [] } = props;
  return (
    <div className={styles.cell_actions}>
      {items.map((item, index) => (
        <Tooltip title={item.title}>
          <span className={styles.action} onClick={item.action}>
            <item.Icon />
          </span>
        </Tooltip>
      ))}
    </div>
  );
};

const jobList = (data, jobId) => (
  <Menu>
    {data
      .filter((item) => item.id !== parseInt(jobId))
      .map((item) => (
        <Menu.Item key={item.id}>
          <a
            rel="noopener noreferrer"
            href={window.location.origin + '/job/detail/' + item.id}
          >
            {item.title}
          </a>
        </Menu.Item>
      ))}
  </Menu>
);

class HeaderJobDetail extends Component {
  logout = (e) => {
    const { userActions } = this.props;
    e.preventDefault();
    userActions.logout();
  };

  render() {
    const { data, jobId } = this.props;
    return (
      <div className={classnames(styles.header, styles.white)}>
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <a href="/" className={styles.logo}>
              <img src={Logo} alt="logo" />
            </a>
          </div>
          <div className={styles.nav_container}>
            {/* <div className={styles.section_toggle}>
              <div className={classnames(styles.section_item, styles.active)}>
                <span className={styles.icon}>
                  <AuditOutlined />
                </span>
                <span>Applications</span>
              </div>
              <div className={styles.section_item}>
                <span className={styles.icon}>
                  <MailOutlined />
                </span>
                Mail (3)
              </div>
            </div> */}

            <div className={styles.job_selection}>
              <Dropdown
                overlay={jobList(data, jobId)}
                placement="bottomLeft"
                trigger={['click']}
              >
                {/* <Button>bottomLeft</Button> */}
                <div className={styles.dropdown}>
                  <span>
                    {
                      data.filter((item) => item.id === parseInt(jobId))[0]
                        ?.title
                    }
                  </span>
                  <span className={styles.dropdown_icon}>
                    <DownOutlined />
                  </span>
                </div>
              </Dropdown>
            </div>

            {/* <div className={styles.actions}>
              <Actions
                items={[
                  {
                    title: 'Re-post',
                    Icon: RedoOutlined,
                    action: () => {},
                  },
                  {
                    title: 'Edit',
                    Icon: FormOutlined,
                    action: () => {},
                  },
                  {
                    title: 'Share',
                    Icon: ShareAltOutlined,
                    action: () => {},
                  },
                ]}
              />
            </div> */}
            {/* <div className={styles.post_status}>
              <span>Post status</span>
              <div>
                <Switch
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  defaultChecked
                />
              </div>
            </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderJobDetail);
