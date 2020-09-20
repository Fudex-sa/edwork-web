import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import moment from "moment";
import classnames from "classnames";
import styles from "~containers/Dashboard/styles/membership.module.scss";
import { Button } from "../forms";

export default class AdminUserItem extends Component {
  state = {
    inviteLoading: 0,
    blockLoading: 0,
    unblockLoading: 0,
  };

  // resendInvite
  // blockUser
  // unblockUser

  handleInvite = () => {
    const { resendInvite, user } = this.props;
    this.setState({ inviteLoading: 1 });

    resendInvite(user.id, () => {
      this.setState({ inviteLoading: 0 });
    });
  };

  handleBlockUser = () => {
    const { blockUser, user } = this.props;
    this.setState({ blockLoading: 1 });

    blockUser(user.id, () => {
      this.setState({ blockLoading: 0 });
    });
  };

  handleUnblockUser = () => {
    const { unblockUser, user } = this.props;
    this.setState({ unblockLoading: 1 });

    unblockUser(user.id, () => {
      this.setState({ unblockLoading: 0 });
    });
  };

  render() {
    const { user } = this.props;
    const { inviteLoading, blockLoading, unblockLoading } = this.state;
    return (
      <div className={styles.row}>
        <div className={styles.cell}>
          {moment(user.created_at).format("DD MMM YYYY")}
        </div>
        <div className={styles.cell}>{user.name}</div>
        <div className={styles.cell}>{user.email}</div>
        <div className={styles.cell}>
          <span
            className={classnames(styles.active, {
              [styles.not]: !user.active,
            })}
          >
            {user.active ? "Active" : "Need to activate"}
          </span>
        </div>
        <div className={classnames(styles.cell, styles.flex_end)}>
          {!user.active && (
            <Button
              isLoading={inviteLoading}
              text="Resend invit"
              onClick={this.handleInvite}
            />
          )}

          {user.blocked ? (
            <Button
              isLoading={unblockLoading}
              text="Unblock"
              onClick={this.handleUnblockUser}
            />
          ) : (
            <Button
              isLoading={blockLoading}
              danger
              text="Block"
              onClick={this.handleBlockUser}
            />
          )}
        </div>
      </div>
    );
  }
}
