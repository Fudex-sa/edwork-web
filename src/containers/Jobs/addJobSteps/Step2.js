import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { show } from 'redux-modal';
import { message as notify, Checkbox as CheckboxAd } from 'antd';
import { withNamespaces } from 'react-i18next';
import classnames from 'classnames';

// Styles
import styles from '../styles/addJob.module.scss';

// Components
import {
  InputAddJob,
  RadioAddJob,
  DatePickerAddJob,
  LocationList,
  RichEditor,
  SelectAddJob,
  Toggle,
} from '~components/forms';
import Feature from '~components/jobs/Feature';
import LoadingWrapper from '~components/common/LoadingWrapper';

// Actions
import getJobTypes from '../actions/getJobTypes';
import createJob from '../actions/createJob';
import { WizardNavigation } from '~components/wizard';
import AddAddressModal from '../../Registration/AddAddressModal';
import getCompanyAddress from '../actions/getCompanyAddress';
import setJobAddData from '../actions/setJobAddData';
import getJobCategory from '../actions/getJobCategory';

const initialState = {
  jobType: undefined,
  email: '',
  link: '',
  title: '',
  salary: '',
  hiringDate: undefined,
  supportHRDF: undefined,
  location: [],
};

class Step2 extends Component {
  state = {
    ...initialState,
  };

  showAddAddressModal = () => {
    const { modalActions } = this.props;
    modalActions.show('addAddressCompany');
  };

  handleChangeValue = (name, value) => {
    const { jobActions } = this.props;

    jobActions.setJobAddData({
      [name]: value,
    });
  };

  componentDidMount() {
    const { jobActions } = this.props;
    jobActions.getJobTypes();
    jobActions.getCompanyAddress();
    jobActions.getJobCategory();
  }

  onSubmit = () => {
    const { jobActions, nextStep, addJobData } = this.props;
    const {
      location,
      email,
      link,
      jobType,
      title,
      salary,
      hiringDate,
      supportHRDF,
    } = addJobData;

    // if (jobType === undefined) {
    //   notify.error('Please fill all field');
    //   return;
    // }
    if (!title) {
      notify.error('Please fill all field');
      return;
    }
    if (!salary) {
      notify.error('Please fill all field');
      return;
    }
    // if (!hiringDate) {
    //   notify.error('Please fill all field');
    //   return;
    // }
    // if (supportHRDF === undefined) {
    //   notify.error('Please fill all field');
    //   return;
    // }

    // jobActions.setJobAddData({ ...this.state });

    if (addJobData?.type !== 'easy') {
      alert('Add job'); //TODO: make request for other type
    } else {
      nextStep();
    }
  };

  render() {
    const {
      location,
      jobType,
      email,
      link,
      title,
      salary,
      hiringDate,
      supportHRDF,
    } = this.state;
    const {
      addJobData = {},
      jobTypesList,
      companyAddressLoading,
      companyAddressList,
      isLoadingjobCategories,
      jobCategories,
      t,
      lang,
    } = this.props;

    const jobTypesOptions = jobTypesList.map((item) => ({
      label: item.name[lang],
      value: item.id,
    }));

    const supportHRDFOptions = ['Yes', 'No'].map((item, index) => ({
      label: item,
      value: index,
    }));

    const companyAdressessOptions = companyAddressList.map((item) => ({
      id: item.id,
      label: item.address_line,
    }));

    const categoryOptions = jobCategories.map((item) => ({
      id: item.id,
      name: item.name[lang],
      value: item.id,
    }));

    return (
      <div className={styles.container}>
        <LoadingWrapper
          isLoading={companyAddressLoading || isLoadingjobCategories}
        >
          <div className={classnames(styles.content_small_center)}>
            <div className={styles.input_container}>
              {addJobData.postingType?.id === 1 && (
                <InputAddJob
                  value={addJobData.email}
                  label={t('input.add_job.email_title')}
                  subLabel={t('input.add_job.email_subtitle')}
                  onChange={({ target }) => {
                    this.handleChangeValue('email', target.value);
                  }}
                />
              )}

              {addJobData.postingType?.id === 2 && (
                <InputAddJob
                  value={addJobData.link}
                  label={t('input.add_job.link_title')}
                  subLabel={t('input.add_job.link_subtitle')}
                  onChange={({ target }) => {
                    this.handleChangeValue('link', target.value);
                  }}
                />
              )}
            </div>

            <div className={styles.input_container}>
              <InputAddJob
                value={addJobData.title}
                label={t('input.add_job.job_title')}
                subLabel={t('input.add_job.job_subtitle')}
                onChange={({ target }) => {
                  this.handleChangeValue('title', target.value);
                }}
              />
            </div>
            {/* <div className={styles.input_container}>
              <SelectAddJob
                label={t('input.add_job.job_category')}
                options={categoryOptions}
                value={addJobData.category}
                // placeholder="Select category"
                onChange={(value) => {
                  this.handleChangeValue('category', value);
                }}
              />
            </div> */}
            {/* <div className={styles.input_container}>
              <DatePickerAddJob
                value={addJobData.hiringDate}
                label={t('input.add_job.job_hiring_date')}
                subLabel={t('input.add_job.job_hiring_date_subtitle')}
                onChange={(value) => {
                  this.handleChangeValue('hiringDate', value);
                }}
              />
            </div> */}
            <div className={styles.input_container}>
              <RadioAddJob
                value={addJobData.jobType}
                label={t('input.add_job.job_type')}
                options={jobTypesOptions}
                onChange={({ target }) => {
                  this.handleChangeValue('jobType', target.value);
                }}
              />
            </div>
            
            {/* <div className={styles.input_container}>
              <RadioAddJob
                value={addJobData.supportHRDF}
                label={t('input.add_job.job_hrdf_support')}
                options={supportHRDFOptions}
                onChange={({ target }) => {
                  this.handleChangeValue('supportHRDF', target.value);
                }}
              />
            </div> */}
            <div className={styles.input_container}>
              <InputAddJob
                value={addJobData.salary}
                label={t('input.add_job.job_salary')}
                subLabel={t('input.add_job.job_salary_subtitle')}
                onChange={({ target }) => {
                  this.handleChangeValue('salary', target.value);
                }}
              />
            </div>

            {/* <div className={styles.input_container}>
              <Toggle
                label={t('input.add_job.online_job.label')}
                checked={addJobData.online}
                onChange={(checked) => {
                  this.handleChangeValue('online', checked);
                  if (checked) {
                    this.handleChangeValue('location', []);
                  }
                }}
              />
            </div> */}

            {!addJobData.online && (
              <div className={styles.input_container}>
                <LocationList
                  options={companyAdressessOptions}
                  value={
                    addJobData.location
                      ? addJobData.location.map((item) => item.label)
                      : []
                  }
                  addAddress={this.showAddAddressModal}
                  onChange={(value) => {
                    this.handleChangeValue('location', value);
                  }}
                  onCheckAll={(value) => {
                    this.handleChangeValue('location', value);
                  }}
                />
              </div>
            )}

            <div className={styles.input_container} dir="ltr">
              <RichEditor
                value={addJobData.description}
                onChange={(value) => {
                  this.handleChangeValue('description', value);
                }}
              />
            </div>
          </div>

          <AddAddressModal
            submitCb={() => {
              const { jobActions } = this.props;
              jobActions.getCompanyAddress();
            }}
          />
          <WizardNavigation
            finishBtnText={t('button.add_job')}
            options={this.props}
            onSubmit={this.onSubmit}
          />
        </LoadingWrapper>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  createJobLoading: store.jobs.createJobLoading,
  jobTypesLoading: store.jobs.jobTypesLoading,
  jobTypesList: store.jobs.jobTypesList,
  addJobData: store.jobs.addJobData,

  companyAddressLoading: store.jobs.companyAddressLoading,
  companyAddressList: store.jobs.companyAddressList,
  isLoadingjobCategories: store.jobs.isLoadingjobCategories,
  jobCategories: store.jobs.jobCategories,

  lang: store.locale.lang,
});

const mapDispatchToProps = (dispatch) => ({
  jobActions: bindActionCreators(
    {
      getJobTypes,
      createJob,
      getCompanyAddress,
      setJobAddData,
      getJobCategory,
    },
    dispatch
  ),
  modalActions: bindActionCreators({ show }, dispatch), //TODO: move to separate func
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Step2));
