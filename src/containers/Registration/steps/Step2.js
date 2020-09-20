import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import { message as notifi } from "antd";

// Styles
import styles from "../styles/step.module.scss";
import inputStyles from "~components/forms/input/styles/input.module.scss";

// Components
import WizardNavigation from "~components/wizard/WizardNavigation";
import Input from "~components/forms/input/Input";
import Select from "~components/forms/input/Select";
import AddAddressModal from "../AddAddressModal";

// Actions
import setRegistrationData from "../actions/setRegistrationData";
import createCompany from "../actions/createCompany";
import { FormWrapper } from "~components/forms";

class Step2 extends Component {
  handleChangeUserData = (name, value) => {
    const { registrationActions, registrationData } = this.props;

    const userData = registrationData.user ? { ...registrationData.user } : {};
    userData[name] = value;
    registrationActions.setRegistrationData({
      user: userData,
    });
  };

  onSubmit = () => {
    const { registrationActions, registrationData, handleSuccess } = this.props;

    const formData = new FormData();
    const logo = registrationData.companyLogo
      ? registrationData.companyLogo.file
      : null;
    const address = registrationData.addressList || [];
    formData.append("name", registrationData.companyName);
    formData.append("logo", logo);
    formData.append("cr_number", registrationData.crNumber);
    formData.append("employees", registrationData.employerNumber);
    formData.append(
      "address",
      address.map((item) => item.id)
    );
    formData.append("user", JSON.stringify(registrationData.user));

    registrationActions.createCompany(formData, {
      success: (response) => {
        const { message } = response;
        notifi.success(message);

        registrationActions.setRegistrationData(null);
        if (handleSuccess) handleSuccess();
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  };

  render() {
    const { registrationData, createCompanyLoading } = this.props;
    const { user = {} } = registrationData;
    const { name, email, mobile, position, password } = user;
    return (
      <div>
        <FormWrapper>
          <div className={styles.form}>
            <div className={inputStyles.input_container}>
              <Input
                value={name}
                label="Name"
                placeholder="Type name"
                onChange={({ target }) =>
                  this.handleChangeUserData("name", target.value)
                }
              />
            </div>
            <div className={inputStyles.input_container}>
              <Input
                type="email"
                value={email}
                label="Email"
                placeholder="Type email"
                onChange={({ target }) =>
                  this.handleChangeUserData("email", target.value)
                }
              />
            </div>
            <div className={inputStyles.input_container}>
              <Input
                type="number"
                value={mobile}
                label="Mobile"
                placeholder="Type mobile"
                onChange={({ target }) =>
                  this.handleChangeUserData("mobile", target.value)
                }
              />
            </div>
            <div className={inputStyles.input_container}>
              <Input
                value={position}
                label="Position"
                placeholder="Type position"
                onChange={({ target }) =>
                  this.handleChangeUserData("position", target.value)
                }
              />
            </div>
            <div className={inputStyles.input_container}>
              <Input
                type="password"
                value={password}
                label="Password"
                placeholder="Type password"
                onChange={({ target }) =>
                  this.handleChangeUserData("password", target.value)
                }
              />
            </div>
          </div>

          <WizardNavigation
            options={this.props}
            onSubmit={this.onSubmit}
            isLoadingSubmit={createCompanyLoading}
          />
        </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  registrationData: store.registration.registrationData,
  createCompanyLoading: store.registration.createCompanyLoading,
});

const mapDispatchToProps = (dispatch) => ({
  registrationActions: bindActionCreators(
    { setRegistrationData, createCompany },
    dispatch
  ),
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
