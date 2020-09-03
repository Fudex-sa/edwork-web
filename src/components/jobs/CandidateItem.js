import React, { PureComponent } from 'react';
import classnames from 'classnames';
import styles from './styles/candidate.module.scss';
import { StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const queryString = require('query-string');

export default class CandidateItem extends PureComponent {
  handleChangeSelectUser = () => {
    const { item, onSelect } = this.props;
    // const user = item?.User;
    onSelect(item);
  };

  render() {
    const { item, selected = {}, onCheckUser, checkedUsers = [] } = this.props;
    const checkedUsersIds = checkedUsers.map((item) => item.id);
    const user = item?.User || {};

    return (
      <div
        className={styles.item}
        onClick={() => this.handleChangeSelectUser()}
      >
        <input
          type="checkbox"
          className={styles.select_item}
          checked={checkedUsersIds.includes(user.id)}
          onClick={(e) => {
            e.stopPropagation();
            onCheckUser(user);
          }}
        />
        <div
          className={classnames(styles.wrapper, {
            [styles.active]: user.id === selected?.user?.id,
          })}
        >
          <div className={styles.info}>
            {/* <p className={styles.date}>Today</p> */}
            <p className={styles.name}>
              {/* <span
              className={classnames(styles.unread, {
                [styles.active]: item !== 0,
              })}
            /> */}
              {user.name}
            </p>
            <p className={styles.message_text}>
              {`${user.Nationality?.name['en']} , ${
                user.Governorate?.name['en']
              }, ${moment().diff(moment(user.birthday), 'years')} years old`}
            </p>
          </div>
          <div className={styles.actions}>
            {/* <span>
              <FontAwesomeIcon icon={['fas', 'comment-alt']} />
            </span> */}
          </div>
        </div>
      </div>
    );
  }
}
