import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { message as notify } from 'antd';

import styles from './styles/membership.module.scss';
import moment from 'moment';
import classnames from 'classnames';

// Components
import HeaderDark from '~components/common/HeaderDark';
import { Button } from '~components/forms';
import InviteUserModal from './InviteUserModal';
import LoadingWrapper from '~components/common/LoadingWrapper';
import AdminUserItem from '~components/user/AdminUserItem';

// Actions
import companyAdminList from './actions/companyAdminList';
import blockUser from '../Auth/actions/blockUser';
import unblockUser from '../Auth/actions/unblockUser';
import resendValidation from '../Auth/actions/resendValidation';
import changeUserBlockParams from './actions/changeUserBlockParams';
import updateUser from './actions/updateUser';
import CoworkersItems from '~components/user/CoworkersItems';

class CoWorkers extends Component {
  showInvitecoworkers = () => {
    const { modalActions } = this.props;
    modalActions.show('inviteUser');
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
  handleBlockUser = (userId, value, cb) => {
    const { dashboardActions } = this.props;
    dashboardActions.updateUser(
      { id: userId, blocked: value },
      {
        success: (response) => {
          const { message } = response;
          notify.success(message);
          dashboardActions.changeUserBlockParams(userId, { blocked: value });
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

  handleMakeAdmin = (userId, value, cb) => {
    const { dashboardActions } = this.props;
    dashboardActions.updateUser(
      { id: userId, admin: value },
      {
        success: (response) => {
          const { message } = response;
          notify.success(message);
          dashboardActions.changeUserBlockParams(userId, { admin: value });
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
            <h2>Co-workers</h2>
            <Button
              text="Invite co-workers"
              shape="round"
              onClick={this.showInvitecoworkers}
            />
          </div>
          <div className={styles.user_list}>
            <LoadingWrapper isLoading={adminListLoading}>
              {adminList.map((user) => (
                <CoworkersItems
                  key={user.id}
                  user={user}
                  resendInvite={this.handleResendInvite}
                  blockUser={this.handleBlockUser}
                  unblockUser={this.handleUnblockUser}
                  makeAdmin={this.handleMakeAdmin}
                />
              ))}
            </LoadingWrapper>
          </div>
        </div>
        <InviteUserModal />
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
      updateUser,
      blockUser,
      unblockUser,
      resendValidation,
      changeUserBlockParams,
    },
    dispatch
  ),
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(mapStateToProps, mapDispatchToProps)(CoWorkers);
