import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify } from 'antd';
import { withNamespaces } from 'react-i18next';

// Styles
import settingsStyles from './styles/settings.module.scss';
import styles from '~containers/Registration/styles/step.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import { Input, Button } from '~components/forms';

// Actions
import updateUserData from './actions/updateUserData';

class UserForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    position: '',
  };

  componentDidMount() {
    const { userData } = this.props;
    const { first_name, last_name, email, mobile, position } = userData;
    this.setState({
      firstName: first_name,
      lastName: last_name,
      email,
      mobile,
      position,
    });
  }

  onSubmit = () => {
    const { settingsActions, userData } = this.props;
    const { firstName, lastName, email, mobile, position } = this.state;

    const data = {
      id: userData.id,
      first_name: firstName,
      last_name: lastName,
      email,
      mobile,
      position,
    };

    settingsActions.updateUserData(data, {
      success: (response) => {
        const { message } = response;
        notify.success(message);
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  render() {
    const { accoundDataUpdateLoading, t } = this.props;
    const { firstName, lastName, email, mobile, position } = this.state;
    return (
      <div>
        <div className={styles.form}>
          {/* <div
            className={classnames(
              inputStyles.input_container,
              inputStyles.file
            )}
          >
            <Avatar
              value={companyLogo}
              placeholder="Upload user avatar"
              onChange={(image) => {
                registrationActions.setRegistrationData({
                  companyLogo: image,
                });
              }}
            />
          </div> */}
          <div className={inputStyles.input_container}>
            <Input
              value={firstName}
              label={t('input.first_name.label')}
              placeholder={t('input.first_name.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  firstName: target.value,
                });
              }}
            />
          </div>{' '}
          <div className={inputStyles.input_container}>
            <Input
              value={lastName}
              label={t('input.last_name.label')}
              placeholder={t('input.last_name.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  lastName: target.value,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              type="email"
              value={email}
              label={t('input.email.label')}
              placeholder={t('input.email.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  email: target.value,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              type="number"
              value={mobile}
              label={t('input.mobile.label')}
              placeholder={t('input.mobile.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  mobile: target.value,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              value={position}
              label={t('input.position.label')}
              placeholder={t('input.position.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  position: target.value,
                });
              }}
            />
          </div>
          <div className={settingsStyles.button_wrapper}>
            <Button
              isLoading={accoundDataUpdateLoading}
              text={t('button.update')}
              size="large"
              fullWidth
              onClick={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  accoundDataUpdateLoading: store.settings.accoundDataUpdateLoading,
});

const mapDispatchToProps = (dispatch) => ({
  settingsActions: bindActionCreators({ updateUserData }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(UserForm));
