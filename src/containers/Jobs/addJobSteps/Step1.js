import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify } from 'antd';
import { withNamespaces } from 'react-i18next';
import { RocketOutlined, MailOutlined, LinkOutlined } from '@ant-design/icons';

// Styles
import styles from '../styles/addJob.module.scss';

// Actions
import getJobTypes from '../actions/getJobTypes';
import createJob from '../actions/createJob';
import { WizardNavigation } from '~components/wizard';
import setJobAddData from '../actions/setJobAddData';

class Step1 extends Component {
  componentDidMount() {
    const { jobActions } = this.props;
    jobActions.getJobTypes();
  }

  handleChangePostType = (data) => {
    const { jobActions, addJobData } = this.props;
    let priceSum = addJobData.priceSum || 0;

    priceSum = data.price;

    jobActions.setJobAddData({
      postingType: data,
      type: data.type,
      priceSum,
      features: [],
    });
  };

  onSubmit = () => {
    const { nextStep, addJobData } = this.props;

    if (!addJobData.postingType) {
      notify.error('Pleese choose prefer type');
      return;
    }

    nextStep();
    // jobActions.createJob(data, {
    //   success: (response) => {
    //     const { message } = response;
    //     notify.success(message);
    //     this.setState(initialState);
    //   },
    //   fail: (response) => {
    //     const { message } = response;
    //     notify.error(message);
    //   },
    // });
  };

  render() {
    const { jobActions, addJobData, userData, t } = this.props;
    const typeOptions = [
      {
        id: 0,
        type: 'easy',
        title: t('job.add_job.type.app.title'),
        description: t('job.add_job.type.app.desc'),
        price: 0,
        Icon: RocketOutlined,
      },
      {
        id: 1,
        type: 'email',
        title: t('job.add_job.type.email.title'),
        description: t('job.add_job.type.email.desc'),
        price: 99,
        Icon: MailOutlined,
      },
      {
        id: 2,
        type: 'link',
        title: t('job.add_job.type.link.title'),
        description: t('job.add_job.type.link.desc'),
        price: 99,
        Icon: LinkOutlined,
      },
    ];
    const { postingType = {} } = addJobData;
    const hasUserPro = userData?.Company?.plan;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.step_heading}>
            <h2>{t('job.add_job.step1.title')}</h2>
            <h3>{t('job.add_job.step1.description')}</h3>
          </div>

          <div className={styles.job_types}>
            {typeOptions.map((item, index) => (
              <label className={styles.item} key={index}>
                <input
                  checked={item.id === postingType.id}
                  value={item.id}
                  type="radio"
                  name="job-type"
                  onChange={() => {
                    this.handleChangePostType(item);
                  }}
                />
                <div className={styles.item_content}>
                  <div className={styles.icon}>
                    <item.Icon />
                  </div>
                  <p className={styles.type_title}>{item.title}</p>
                  <p className={styles.description}>{item.description}</p>
                  {!hasUserPro && (
                    <div className={styles.type_price}>
                      {item.price === 0 && (
                        <span className={styles.sup_price}>
                          {t('job.add_job.start_with')}
                        </span>
                      )}
                      <span className={styles.price}>
                        {item.price === 0 ? 'Free' : `${item.price} SAR`}
                      </span>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
        {/* <div className={styles.button_wrapper}>
            <Button
              isLoading={createJobLoading}
              text="Create job"
              size="large"
              onClick={this.onSubmit}
            />
          </div> */}
        <WizardNavigation options={this.props} onSubmit={this.onSubmit} />
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
});

const mapDispatchToProps = (dispatch) => ({
  jobActions: bindActionCreators(
    { getJobTypes, createJob, setJobAddData },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Step1));
