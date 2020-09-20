import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import classnames from 'classnames';
import styles from '~containers/Dashboard/styles/membership.module.scss';
import { Button, Select } from '../forms';

const typeOptions = ['Admin', 'Normal'];

export default class CoworkersItems extends Component {
  state = {
    inviteLoading: 0,
    blockLoading: 0,
    unblockLoading: 0,
    type: 'Normal',
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      type: user.admin ? typeOptions[0] : typeOptions[1],
    });
  }

  handleInvite = () => {
    const { resendInvite, user } = this.props;
    this.setState({ inviteLoading: 1 });

    resendInvite(user.id, () => {
      this.setState({ inviteLoading: 0 });
    });
  };

  handleBlockUser = () => {
    const { blockUser, user } = this.props;
    this.setState({ blockLoading: 1 }, () => {
      blockUser(user.id, !user.blocked, () => {
        this.setState({ blockLoading: 0 });
      });
    });
  };

  handleChangeType = (value) => {
    const { makeAdmin, user } = this.props;
    this.setState({ type: value }, () => {
      makeAdmin(user.id, value === typeOptions[0]);
    });
  };

  render() {
    const { user } = this.props;
    const { inviteLoading, blockLoading, unblockLoading, type } = this.state;
    return (
      <div className={styles.row}>
        <div className={styles.cell}>
          {/* {moment(user.created_at).format('DD MMM YYYY')} */}
          {`${user.first_name} ${user.last_name}`}
        </div>
        <div className={styles.cell}>{user.email}</div>
        <div className={styles.cell}>
          <Select
            disabled={user.blocked}
            value={type}
            // label="Validity"
            customWrapperStyle={{}}
            noMarginContainer
            placeholder="Type"
            options={typeOptions}
            onChange={this.handleChangeType}
          />
        </div>
        <div className={styles.cell}>
          <span style={{ textAlign: 'center', flex: 1 }}>0</span>
        </div>
        <div className={styles.cell}>
          <span
            className={classnames(styles.active, {
              [styles.not]: !user.active,
            })}
          >
            {user.active ? 'Active' : 'Invitation is not accepted yet'}
          </span>
        </div>
        <div className={classnames(styles.cell, styles.flex_end)}>
          {!user.active ? (
            <Button
              isLoading={inviteLoading}
              text="Resend invit"
              onClick={this.handleInvite}
            />
          ) : user.blocked ? (
            <Button
              isLoading={unblockLoading}
              text="Activate again"
              onClick={this.handleBlockUser}
            />
          ) : (
            <Button
              isLoading={blockLoading}
              danger
              text="Make inactive"
              onClick={this.handleBlockUser}
            />
          )}
        </div>
      </div>
    );
  }
}
