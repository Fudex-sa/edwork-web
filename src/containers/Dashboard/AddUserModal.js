import React, { Component } from "react";
import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Row, Col, message as notify } from "antd";

// Styles
import styles from "./styles/membership.module.scss";
import inputStyles from "~components/forms/input/styles/input.module.scss";

// Components
import Modal from "~components/common/Modal";
import { Input, Button } from "~components/forms";

// Actions
import inviteAdminUser from "../Auth/actions/inviteAdminUser";
import companyAdminList from "./actions/companyAdminList";

class AddUserModal extends Component {
  state = {
    email: "",
    mobile: "",
    name: "",
    position: "",
    password: "",
  };

  onSubmit = () => {
    const { userActions, dashboardActions, handleHide } = this.props;
    const { email, mobile, name, position, password } = this.state;
    const data = {
      user: {
        name,
        email,
        mobile,
        position,
        password,
      },
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
    const { email, mobile, name, position, password } = this.state;

    return (
      <Modal
        className="modal_content gray_content small"
        modalIsOpen={show}
        onRequestClose={handleHide}
        title="Add user"
      >
        <div className={styles.content}>
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
              value={name}
              label="User full name"
              placeholder="Type full name"
              onChange={(el) => {
                this.setState({
                  name: el.target.value,
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
            <Input
              type="password"
              value={password}
              label="Password"
              placeholder="Type password"
              onChange={(el) => {
                this.setState({
                  password: el.target.value,
                });
              }}
            />
          </div>

          <div className={styles.button_wrapper}>
            <Button
              isLoading={inviteUserLoading}
              text="Add user"
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

export default connectModal({ name: "addUserMembership" })(
  connect(mapStateToProps, mapDispatchToProps)(AddUserModal)
);
