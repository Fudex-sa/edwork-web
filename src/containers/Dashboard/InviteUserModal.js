import React, { Component } from 'react';
import { connectModal } from 'redux-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, message as notify } from 'antd';

// Styles
import styles from './styles/membership.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import Modal from '~components/common/Modal';
import { Input, Button, Select } from '~components/forms';

// Actions
import inviteAdminUser from '../Auth/actions/inviteAdminUser';
import companyAdminList from './actions/companyAdminList';

const typeOptions = ['Admin', 'Normal'];
class InviteUserModal extends Component {
  state = {
    email: '',
    mobile: '',
    firstName: '',
    lastName: '',
    position: '',
    type: undefined,
  };

  onSubmit = () => {
    const { userActions, dashboardActions, handleHide } = this.props;
    const { email, mobile, firstName, lastName, position, type } = this.state;

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile: mobile,
      position: position,
      admin: typeOptions[0] === type,
    };

    userActions.inviteAdminUser(data, {
      success: (response) => {
        const { message } = response;
        handleHide();
        notify.success(message);
        dashboardActions.companyAdminList();
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  render() {
    const { show, handleHide, inviteUserLoading } = this.props;
    const { email, mobile, firstName, lastName, position, type } = this.state;

    return (
      <Modal
        className="modal_content white_content small"
        modalIsOpen={show}
        onRequestClose={handleHide}
        title="Invite user"
      >
        <div className={styles.content_invite}>
          <div className={inputStyles.input_container}>
            <Input
              type="email"
              value={email}
              label="Email"
              placeholder="Type email"
              onChange={(el) => {
                this.setState({
                  email: el.target.value,
                });
              }}
            />
          </div>

          <div className={inputStyles.input_container}>
            <Input
              type="number"
              value={mobile}
              label="Phone"
              placeholder="Type phone"
              onChange={(el) => {
                this.setState({
                  mobile: el.target.value,
                });
              }}
            />
          </div>

          <div className={inputStyles.input_container}>
            <Input
              value={firstName}
              label="First name"
              placeholder="Type first name"
              onChange={(el) => {
                this.setState({
                  firstName: el.target.value,
                });
              }}
            />
          </div>

          <div className={inputStyles.input_container}>
            <Input
              value={lastName}
              label="Last name"
              placeholder="Type last name"
              onChange={(el) => {
                this.setState({
                  lastName: el.target.value,
                });
              }}
            />
          </div>

          <div className={inputStyles.input_container}>
            <Input
              value={position}
              label="Position"
              placeholder="Type position"
              onChange={(el) => {
                this.setState({
                  position: el.target.value,
                });
              }}
            />
          </div>

          <div className={inputStyles.input_container}>
            <Select
              value={type}
              // label="Validity"
              noMarginContainer
              placeholder="Type"
              options={typeOptions}
              onChange={this.handleChangeType}
            />
          </div>

          <div className={styles.button_wrapper}>
            <Button
              isLoading={inviteUserLoading}
              text="Invite user"
              fullWidth
              classStyle={styles.btn}
              onClick={this.onSubmit}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (store) => ({
  inviteUserLoading: store.user.inviteUserLoading,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators({ inviteAdminUser }, dispatch),
  dashboardActions: bindActionCreators({ companyAdminList }, dispatch),
});

export default connectModal({ name: 'inviteUser' })(
  connect(mapStateToProps, mapDispatchToProps)(InviteUserModal)
);
