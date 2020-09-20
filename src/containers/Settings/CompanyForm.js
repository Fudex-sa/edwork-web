import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { message as notify } from 'antd';
import { withNamespaces } from 'react-i18next';

import classnames from 'classnames';
import { PlusOutlined } from '@ant-design/icons';

// Styles
import settingsStyles from './styles/settings.module.scss';
import styles from '~containers/Registration/styles/step.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import { Avatar, Input, Select, Button } from '~components/forms';
import AddAddressModal from '../Registration/AddAddressModal';

// Actions
import updateCompanyData from './actions/updateCompanyData';
import setRegistrationData from '../Registration/actions/setRegistrationData';

class CompanyForm extends Component {
  state = {
    companyName: '',
    employerNumber: '',
    companyLogo: '',
    webSite: '',
    aboutBusines: '',
    businesField: '',
  };

  componentDidMount() {
    const { userData } = this.props;
    if (userData['Company']) {
      const {
        name,
        employees,
        logo_path,
        website,
        business_field,
        description,
      } = userData['Company'];
      this.setState({
        companyName: name,
        employerNumber: employees,
        companyLogo: logo_path || '',
        webSite: website,
        aboutBusines: description,
        businesField: business_field,
      });
    }
  }

  showAddAddressModal = () => {
    const { modalActions } = this.props;
    modalActions.show('addAddressCompany');
  };

  removeAddressItem = (index) => {
    const { registrationData, registrationActions } = this.props;
    let addressList = registrationData.addressList
      ? registrationData.addressList.slice()
      : [];
    if (addressList.length > 0) addressList.splice(index, 1);
    registrationActions.setRegistrationData({ addressList });
  };

  onSubmit = () => {
    const { settingsActions, registrationData = {} } = this.props;
    const {
      companyName,
      employerNumber,
      companyLogo,
      webSite,
      aboutBusines,
      businesField,
    } = this.state;
    const { addressList = [] } = registrationData;

    const formData = new FormData();
    const logo = companyLogo ? companyLogo.file : null;
    formData.append('name', companyName);
    if (typeof companyLogo !== 'string') formData.append('logo', logo);
    formData.append('employees', employerNumber);
    formData.append(
      'address',
      addressList.map((item) => item.id)
    );
    formData.append('website', webSite);
    formData.append('business_field', businesField);
    formData.append('description', aboutBusines);

    settingsActions.updateCompanyData(formData, {
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
    const { registrationData, accoundDataUpdateLoading, t } = this.props;
    const { addressList = [] } = registrationData;
    const {
      companyName,
      employerNumber,
      companyLogo,
      webSite,
      aboutBusines,
      businesField,
    } = this.state;
    return (
      <div>
        <div className={styles.form}>
          <div
            className={classnames(
              inputStyles.input_container,
              inputStyles.file
            )}
          >
            <Avatar
              value={companyLogo}
              placeholder={t('input.input.avatar_placeholder')}
              onChange={(image) => {
                this.setState({
                  companyLogo: image,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              value={companyName}
              label={t('input.input.company_name.label')}
              placeholder={t('input.input.company_name.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  companyName: target.value,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              value={webSite}
              label={t('input.input.web_site.label')}
              placeholder={t('input.input.web_site.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  webSite: target.value,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              value={aboutBusines}
              label={t('input.about_business.label')}
              placeholder={t('input.about_business.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  aboutBusines: target.value,
                });
              }}
            />
          </div>
          <div className={inputStyles.input_container}>
            <Input
              value={businesField}
              label={t('input.business_field.label')}
              placeholder={t('input.business_field.placeholder')}
              onChange={({ target }) => {
                this.setState({
                  aboutBusines: target.value,
                });
              }}
            />
          </div>

          <div className={inputStyles.input_container}>
            <Select
              value={employerNumber}
              label={t('input.number_employer.label')}
              placeholder={t('input.number_employer.placeholder')}
              options={['1-5', '6-49', '50-500', 'More than 500']}
              onChange={({ target }) => {
                this.setState({
                  employerNumber: target,
                });
              }}
            />
          </div>
          {/* <div className={inputStyles.input_container}>
            <button
              className={styles.address_btn}
              onClick={this.showAddAddressModal}
            >
              <PlusOutlined />
              <span>Add address</span>
            </button>
            {addressList.map((item, index) => (
              <div className={styles.address_item} key={item.id}>
                <div className={styles.address_info}>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span className={styles.address_text}>{item.address}</span>
                </div>
                <span
                  role="button"
                  className={styles.remove_item}
                  onClick={() => this.removeAddressItem(index)}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </span>
              </div>
            ))}
          </div> */}
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
        <AddAddressModal />
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  userData: store.auth.user,
  accoundDataUpdateLoading: store.settings.accoundDataUpdateLoading,
  registrationData: store.registration.registrationData,
});

const mapDispatchToProps = (dispatch) => ({
  registrationActions: bindActionCreators({ setRegistrationData }, dispatch),
  settingsActions: bindActionCreators({ updateCompanyData }, dispatch),
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(CompanyForm));
