import React, { Component } from 'react';
import { connectModal } from 'redux-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';

import { message as notifi } from 'antd';

// Styles
import styles from './styles/add-custom-category.module.scss';

// Components
import Modal from '~components/common/Modal';
import { Input, Button, Select } from '~components/forms';
import createCustomCategory from './actions/createCustomCategory';
import getCandidateDetail from './actions/getCandidateDetail';

class AddCustomCategory extends Component {
  state = {
    name: '',
    type: undefined,
  };

  componentDidMount() {
    // const { registrationActions } = this.props;
    // registrationActions.getRegion();
  }

  onSubmit = () => {
    const { categoryActions, handleHide, submitCb, jobId } = this.props;
    const { name, type } = this.state;

    const data = {
      job_id: jobId,
      name: name,
      type: type.toLowerCase(),
    };

    categoryActions.createCustomCategory(data, {
      success: (response) => {
        const { message, data } = response;

        notifi.success(message);
        categoryActions.getCandidateDetail();
        if (submitCb) submitCb();
        handleHide();
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  };

  render() {
    const { show, handleHide, isLoadingCustomCategory, t } = this.props;
    const { name, type } = this.state;

    return (
      <Modal
        className="modal_content gray_content small"
        modalIsOpen={show}
        onRequestClose={handleHide}
        title={t('modal.custom_category.title')}
      >
        <div className={styles.content}>
          <Input
            label={t('input.custom_category.name.label')}
            placeholder={t('input.custom_category.name.placeholder')}
            value={name}
            onChange={({ target }) => {
              this.setState({ name: target.value });
            }}
          />

          <Select
            label={t('input.custom_category.category_type.label')}
            options={['Good', 'Maybe', 'Rejected']}
            placeholder={t('input.custom_category.category_type.placeholder')}
            value={type}
            onChange={(value) => {
              this.setState({ type: value });
            }}
          />

          <div className={styles.button_wrapper}>
            <Button
              isLoading={isLoadingCustomCategory}
              text={t('button.new_category')}
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
  isLoadingCustomCategory: store.jobs.isLoadingCustomCategory,
});

const mapDispatchToProps = (dispatch) => ({
  categoryActions: bindActionCreators(
    { createCustomCategory, getCandidateDetail },
    dispatch
  ),
});

export default connectModal({ name: 'addCustomCategory' })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withNamespaces()(AddCustomCategory))
);
