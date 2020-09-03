import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import { message as notify } from "antd";

import styles from "./styles/membership.module.scss";
import moment from "moment";
import classnames from "classnames";

// Components
import HeaderDark from "~components/common/HeaderDark";
import { Button } from "~components/forms";
import AddUserModal from "./AddUserModal";
import LoadingWrapper from "~components/common/LoadingWrapper";

// Actions
import companyAdminList from "./actions/companyAdminList";
import AdminUserItem from "~components/user/AdminUserItem";
import blockUser from "../Auth/actions/blockUser";
import unblockUser from "../Auth/actions/unblockUser";
import resendValidation from "../Auth/actions/resendValidation";
import changeUserBlockParams from "./actions/changeUserBlockParams";

class Membership extends Component {
  showAddUserModal = () => {
    const { modalActions } = this.props;
    modalActions.show("addUserMembership");
  };

  componentDidMount() {
    const { dashboardActions } = this.props;
    dashboardActions.companyAdminList();
  }

  handleResendInvite = (userId, cb) => {
    const { dashboardActions } = this.props;
    dashboardActions.resendValidation(
      { user_id: userId },
      {
        success: (response) => {
          const { message } = response;
          notify.success(message);
          if (cb) cb();
        },
        fail: (response) => {
          const { message } = response;
          notify.error(message);
          if (cb) cb();
        },
      }
    );
  };
  handleBlockUser = (userId, cb) => {
    const { dashboardActions } = this.props;
    dashboardActions.blockUser(
      { user_id: userId },
      {
        success: (response) => {
          const { message } = response;
          notify.success(message);
          dashboardActions.changeUserBlockParams(userId, true);
          if (cb) cb();
        },
        fail: (response) => {
          const { message } = response;
          notify.error(message);
          if (cb) cb();
        },
      }
    );
    if (cb) cb();
  };
  handleUnblockUser = (userId, cb) => {
    const { dashboardActions } = this.props;
    dashboardActions.unblockUser(
      { user_id: userId },
      {
        success: (response) => {
          const { message } = response;
          notify.success(message);
          dashboardActions.changeUserBlockParams(userId, false);
          if (cb) cb();
        },
        fail: (response) => {
          const { message } = response;
          notify.error(message);
          if (cb) cb();
        },
      }
    );
    if (cb) cb();
  };

  render() {
    const { adminListLoading, adminList = [] } = this.props;

    return (
      <div>
        <HeaderDark />
        <div className={styles.container}>
          <div className={styles.head}>
            <h2>Membership & users</h2>
            <Button
              text="Add new memeber"
              shape="round"
              onClick={this.showAddUserModal}
            />
          </div>
          <div className={styles.user_list}>
            <LoadingWrapper isLoading={adminListLoading}>
              {adminList.map((user) => (
                <AdminUserItem
                  key={user.id}
                  user={user}
                  resendInvite={this.handleResendInvite}
                  blockUser={this.handleBlockUser}
                  unblockUser={this.handleUnblockUser}
                />
              ))}
            </LoadingWrapper>
          </div>
        </div>
        <AddUserModal />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  adminListLoading: store.dashboard.adminListLoading,
  adminList: store.dashboard.adminList,
});

const mapDispatchToProps = (dispatch) => ({
  dashboardActions: bindActionCreators(
    {
      companyAdminList,
      blockUser,
      unblockUser,
      resendValidation,
      changeUserBlockParams,
    },
    dispatch
  ),
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(mapStateToProps, mapDispatchToProps)(Membership);
