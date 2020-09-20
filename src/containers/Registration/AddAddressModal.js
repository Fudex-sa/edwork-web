import React, { Component } from "react";
import { connectModal } from "redux-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";

import { Row, Col, message as notifi } from "antd";

// Styles
import styles from "./styles/addAddress.module.scss";
import inputStyles from "~components/forms/input/styles/input.module.scss";

// Components
import Modal from "~components/common/Modal";
import { Input, Button, Select } from "~components/forms";
import getRegion from "./actions/getRegion";
import setGovernorates from "./actions/setGovernorates";
import setRegistrationData from "./actions/setRegistrationData";
import LoadingWrapper from "~components/common/LoadingWrapper";
import createAddress from "./actions/createAddress";

class AddAddressModal extends Component {
  state = {
    selectRegionId: null,
    selectGovernarateId: null,
    address: ""
  };

  componentDidMount() {
    const { registrationActions } = this.props;

    registrationActions.getRegion();
  }

  handleChangeRegion = regionId => {
    const { registrationActions, regions } = this.props;
    this.setState(
      {
        selectRegionId: regionId
      },
      () => {
        const governorate = regions.filter(item => item.id === regionId)[0];
        registrationActions.setGovernorates(governorate["Governorates"]);
      }
    );
  };

  onSubmit = () => {
    const { registrationActions, registrationData, handleHide, submitCb } = this.props;

    const { address, selectGovernarateId } = this.state;

    const data = {
      address_line: address,
      governorate_id: selectGovernarateId
    };

    registrationActions.createAddress(data, {
      success: response => {
        const { message, data } = response;
        notifi.success(message);

        // add address list in redux storage
        let addressList = registrationData.addressList
          ? registrationData.addressList.slice()
          : [];

        addressList = [...addressList, { address, id: data.id }];

        registrationActions.setRegistrationData({ addressList });

        if (submitCb) submitCb();

        handleHide();
      },
      fail: response => {
        const { message } = response;

        notifi.error(message);
      }
    });
  };

  render() {
    const {
      show,
      handleHide,
      createAddressLoading,
      isLoadingRegion,
      regions,
      governorates,
      t,
      i18n
    } = this.props;
    const { address } = this.state;

    const regionsOptions = regions.map(region => ({
      name: region.name[i18n.language],
      value: region.id
    }));
    const governoratesOptions = governorates.map(governorate => ({
      name: governorate.name[i18n.language],
      value: governorate.id
    }));

    return (
      <Modal
        className='modal_content gray_content small'
        modalIsOpen={show}
        onRequestClose={handleHide}
        title={t("modal.add_address.title")}>
        <LoadingWrapper isLoading={isLoadingRegion}>
          <div className={styles.content}>
            <Row>
              <Col span={12} className={styles.input_gap_left}>
                <Select
                  label='Region'
                  placeholder={t("input.add_address.region.placeholder")}
                  options={regionsOptions}
                  onChange={this.handleChangeRegion}
                />
              </Col>
              <Col span={12} className={styles.input_gap_right}>
                <Select
                  label='Governorate'
                  placeholder={t("input.add_address.governorate.placeholder")}
                  options={governoratesOptions}
                  onChange={value => {
                    this.setState({
                      selectGovernarateId: value
                    });
                  }}
                />
              </Col>
            </Row>
            <Input
              label={t("input.add_address.address.label")}
              placeholder={t("input.add_address.address.placeholder")}
              value={address}
              onChange={({ target }) => {
                this.setState({ address: target.value });
              }}
            />

            {/* address */}

            <div className={styles.button_wrapper}>
              <Button
                isLoading={createAddressLoading}
                text={t("button.add_address")}
                classStyle={styles.btn}
                onClick={this.onSubmit}
              />
            </div>
          </div>
        </LoadingWrapper>
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
  registrationData: store.registration.registrationData,
  createAddressLoading: store.registration.createAddressLoading,
  isLoadingRegion: store.registration.isLoadingRegion,
  regions: store.registration.regions,
  governorates: store.registration.governorates
});

const mapDispatchToProps = dispatch => ({
  registrationActions: bindActionCreators(
    { getRegion, setGovernorates, setRegistrationData, createAddress },
    dispatch
  )
});

export default connectModal({ name: "addAddressCompany" })(
  connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(AddAddressModal))
);
