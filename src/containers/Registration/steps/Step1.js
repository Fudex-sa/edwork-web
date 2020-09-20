import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';

// Styles
import styles from '../styles/step.module.scss';
import inputStyles from '~components/forms/input/styles/input.module.scss';

// Components
import { WizardNavigation } from '~components/wizard';
import { Avatar, Input, Select, FormWrapper } from '~components/forms';
import AddAddressModal from '../AddAddressModal';

// Actions
import setRegistrationData from '../actions/setRegistrationData';

class Step1 extends Component {
  componentDidMount() {}

  removeAddressItem = (index) => {
    const { registrationData, registrationActions } = this.props;
    let addressList = registrationData.addressList
      ? registrationData.addressList.slice()
      : [];
    if (addressList.length > 0) addressList.splice(index, 1);
    registrationActions.setRegistrationData({ addressList });
  };

  render() {
    const { registrationActions, registrationData } = this.props;
    const {
      addressList = [],
      companyName,
      crNumber,
      employerNumber,
      companyLogo,
    } = registrationData;
    return (
      <div>
        <FormWrapper>
          <div className={styles.form}>
            <div
              className={classnames(
                inputStyles.input_container,
                inputStyles.file
              )}
            >
              <Avatar
                value={companyLogo}
                placeholder="Upload company logo"
                onChange={(image) => {
                  registrationActions.setRegistrationData({
                    companyLogo: image,
                  });
                }}
              />
            </div>
            <div className={inputStyles.input_container}>
              <Input
                value={companyName}
                label="Company name"
                placeholder="Type your company name"
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    companyName: el.target.value,
                  });
                }}
              />
            </div>
            <div className={inputStyles.input_container}>
              <Input
                value={crNumber}
                label="CR number"
                placeholder="Type your CR number"
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    crNumber: el.target.value,
                  });
                }}
              />
            </div>

            <div className={inputStyles.input_container}>
              <Select
                value={employerNumber}
                label="Number of employer"
                placeholder="Select company number of employer"
                options={['1-9', '10-49', '50-99']}
                onChange={(value) => {
                  registrationActions.setRegistrationData({
                    employerNumber: value,
                  });
                }}
              />
            </div>
            <div className={inputStyles.input_container}>
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
            </div>
          </div>

          <AddAddressModal />
          <WizardNavigation options={this.props} />
        </FormWrapper>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  registrationData: store.registration.registrationData,
});

const mapDispatchToProps = (dispatch) => ({
  registrationActions: bindActionCreators({ setRegistrationData }, dispatch),
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
