import React, { PureComponent } from 'react';
import styles from './styles/detail-header.module.scss';
import { Dropdown, Menu } from 'antd';
import classnames from 'classnames';
import { SwapOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withNamespaces } from 'react-i18next';

class DetailHeader extends PureComponent {
  render() {
    const {
      selected,
      onMoveUserToCategory,
      checkedUsers = [],
      customCategories = [],
      t,
    } = this.props;
    return (
      <div className={styles.head}>
        {selected && (
          <div className={styles.quick_action}>
            <span>{t('job.detail.quick_contact')}</span>
            <span className={styles.phone}>
              <FontAwesomeIcon icon={['fas', 'phone-alt']} />{' '}
              {selected?.user?.phone}
            </span>
            <a
              href={`mailto:${selected?.user?.email}`}
              className={styles.actions}
            >
              <FontAwesomeIcon icon={['fas', 'envelope']} />
              <span>
                {t('job.detail.send_email', { email: selected?.user?.name })}
              </span>
            </a>
          </div>
        )}

        {/* <div className={styles.search}>
          <div className={styles.wrapper}>
            <div className={styles.input_wrapper}>
              <input type="text" name="search" placeholder="Search ..." />
            </div>
            <span className={styles.icon}>
              <SearchOutlined />
            </span>
          </div>
        </div> */}

        {/* <div className={styles.actions}>
          <div className={classnames(styles.tag, styles.green)}>Plan A</div>
          <div className={classnames(styles.tag, styles.yellow)}>Plan B</div>
          <div className={classnames(styles.tag, styles.red)}>Reject</div>
          <Dropdown overlay={sortMenu} trigger={['click']}>
            <div className={classnames(styles.tag, styles.dropdown)}>
              <p>Tags</p>
              <DownOutlined />
            </div>
          </Dropdown>
        </div> */}

        <div className={styles.rigth_side}>
          {/* <div className={styles.additional_button}>
            <Dropdown overlay={sortMenu} trigger={['click']}>
              <div>
                <span className={styles.icon}>
                  <SwapOutlined rotate={90} />
                </span>
                <span className={styles.text}>Sorting</span>
              </div>
            </Dropdown>
          </div> */}

          {!!checkedUsers.length && (
            <div className={styles.quick_action}>
              <span>{t('job.detail.move_to')}</span>

              <button
                className={classnames(styles.actions, styles.green)}
                onClick={() => {
                  const data = {
                    folder: 'good',
                    folder_type: 'good',
                  };
                  onMoveUserToCategory(data);
                }}
              >
                <span>Good</span>
              </button>
              <button
                className={classnames(styles.actions, styles.orange)}
                onClick={() => {
                  const data = {
                    folder: 'maybe',
                    folder_type: 'maybe',
                  };
                  onMoveUserToCategory(data);
                }}
              >
                <span>Maybe</span>
              </button>
              <button
                className={classnames(styles.actions, styles.red)}
                onClick={() => {
                  const data = {
                    folder: 'rejected',
                    folder_type: 'rejected',
                  };
                  onMoveUserToCategory(data);
                }}
              >
                <span>Rejected</span>
              </button>

              {customCategories.length > 0 && (
                <Dropdown
                  overlay={
                    <Menu>
                      {customCategories.map((item) => (
                        <Menu.Item
                          key={item.id}
                          onClick={() => {
                            const data = {
                              folder: item.name,
                              folder_type: item.type,
                            };
                            onMoveUserToCategory(data);
                          }}
                        >
                          <div>{item.name}</div>
                        </Menu.Item>
                      ))}
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <div className={styles.actions}>
                    <span>Other</span>
                    <FontAwesomeIcon icon={['fas', 'sort-down']} />
                  </div>
                </Dropdown>
              )}
            </div>
          )}
        </div>

        {/* <div className={styles.tools_dropdown}>
          <Dropdown overlay={sortMenu} trigger={['click']}>
            <div
              className={classnames(
                styles.tag,
                styles.dropdown,
                styles.light_yellow
              )}
            >
              <p>Add HR tools</p>
              <DownOutlined />
            </div>
          </Dropdown>
        </div> */}
      </div>
    );
  }
}

export default withNamespaces()(DetailHeader);
