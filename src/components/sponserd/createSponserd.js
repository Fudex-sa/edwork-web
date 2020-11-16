import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import classnames from "classnames";
import { message as notifi } from "antd";
import { withNamespaces } from "react-i18next";

import styles from "~containers/Registration/styles/registration.module.scss";
import inputStyles from "~components/forms/input/styles/input.module.scss";

// Components
import HeaderDark from "~components/common/HeaderDark";
import { Avatar, Input, Select, FormWrapper, Button } from "~components/forms";

// Actions

import createSponserd from "~containers/Auth/actions/createSponserd";
import TextArea from "antd/lib/input/TextArea";

class CreateSponser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: {},
      name: "",
      website: "",
      business_field: "",
      employees: "",
      description: "",
      first_name: "",
      last_name: "",
      position: "",
      mobile: "",
      email: "",
      password: "",
      rePassword: "",
    };
  }

  handleChange = ({ target }) => {
    console.log(target);
    this.setState({
      [target.name]: target.value,
    });
  };
  handleChangeImage = (logo) =>{
    this.setState({logo})
  }
  handleChangeSelect = (employees) =>{
    this.setState({employees})
  }
  onSubmit = () => {
    const {
      logo,
      name,
      website,
      business_field,
      employees,
      description,
      first_name,
      last_name,
      position,
      mobile,
      email,
      password,
      rePassword,
    } = this.state;
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      notifi.error("Please enter correct email");
      return;
    }

    if (password !== rePassword) {
      notifi.error("Please use in a password above 6 symbols");
      return;
    }

    if (password.length <= 6) {
      notifi.error("Please use in a password above 6 symbols");
      return;
    }

    const data = new FormData();

    data.append("logo", logo?.file || null);
    data.append("name", name);
    data.append("website", website);
    data.append("business_field", business_field);
    data.append("employees", employees);
    data.append("description", description);
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("position", position);
    data.append("mobile", mobile);
    data.append("email", email);
    data.append("password", password);
    this.props.createSponserd(data, {
      success: (response) => {
        console.log(response);
        const { history } = this.props;
        const { message, data } = response;
        notifi.success(message);
        // history.replace("/registration/plan");
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  };

  render() {
    const {
      registrationActions,
      createCompanyLoading,
      t,
      userData,
    } = this.props;
    const {
      logo,
      name,
      website,
      business_field,
      employees,
      description,
      first_name,
      last_name,
      position,
      mobile,
      email,
      password,
      rePassword,
    } = this.state;
    return (
      <div>
        <HeaderDark userinfo={userData} />
        <div className={styles.container}>
          <FormWrapper title="Company information">
            <div
              className={classnames(
                inputStyles.input_container,
                inputStyles.file
              )}
            >
              <Avatar
                value={logo}
                name="logo"
                placeholder="avatar placeholder"
                onChange={this.handleChangeImage}
              />
            </div>

            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={name}
                name="name"
                label="company name"
                placeholder="Company Name"
                onChange={this.handleChange}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <Input
                value={website}
                name="website"
                label="Website"
                placeholder="Website"
                onChange={this.handleChange}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={business_field}
                name="business_field"
                label="Business Field"
                placeholder="Business Field"
                onChange={this.handleChange}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Select
                value={employees}
                name="employees"
                label="Number Employer"
                placeholder="Number Employer"
                options={[
                  "1-5 employee",
                  "6-49 employee",
                  "50-500 employee",
                  "More than 500 employee",
                ]}
                onChange={this.handleChangeSelect}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <TextArea
                style={{ marginTop: "20px" }}
                name="description"
                value={description}
                label="About Business"
                placeholder="About Business"
                onChange={this.handleChange}
              />
            </div>
            {/* ========= */}
            <h2 className={styles.sections_title}>Personal Date Title</h2>
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={first_name}
                name="first_name"
                label="First Name"
                placeholder="First Name"
                onChange={this.handleChange}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={last_name}
                name="last_name"
                label="Last Name"
                placeholder="Last Name"
                onChange={this.handleChange}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={position}
                name="position"
                label="Position"
                placeholder="Position"
                onChange={this.handleChange}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                showCount
                value={mobile}
                type="number"
                label="Mobile"
                placeholder="Mobile"
                onChange={this.handleChange}
                name="mobile"
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={email}
                type="email"
                label="Email"
                placeholder="Email"
                onChange={this.handleChange}
                name="email"
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={password}
                type="Password"
                label="Password"
                placeholder="Password"
                onChange={this.handleChange}
                name="password"
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={rePassword}
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                name="rePassword"
              />
            </div>
            {/* ========= */}
            <div className={styles.button_wrapper}>
              <Button
                isLoading={createCompanyLoading}
                fullWidth
                type="submit"
                text="Create"
                size="large"
                onClick={this.onSubmit}
              />
            </div>
            {/* ========= */}
          </FormWrapper>
        </div>
      </div>
    );
  }
}

CreateSponser.propTypes = {
  companies: PropTypes.object.isRequired,
  createCompany: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  userData: auth.user,
});

CreateSponser.propTypes = {};
export default connect(mapStateToProps, { createSponserd })(CreateSponser);
