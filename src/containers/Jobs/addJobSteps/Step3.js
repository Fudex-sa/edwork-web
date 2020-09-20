import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message as notify } from 'antd';
import { withNamespaces } from 'react-i18next';

// Styles
import styles from '../styles/addJob.module.scss';

// Components

// Actions
import getJobTypes from '../actions/getJobTypes';
import createJob from '../actions/createJob';
import { WizardNavigation } from '~components/wizard';
import setJobAddData from '../actions/setJobAddData';
import PriceSum from '~components/wizard/PriceSum';

// Assets
import VideoType from '~assets/imgs/video-record-type.svg';
import RadioMultipleType from '~assets/imgs/radio-multiple-type.svg';
import LocationType from '~assets/imgs/location-type.svg';
import EvaluationTypeIcon from '~assets/imgs/evaluation-type.svg';

class Step3 extends Component {
  handleSelectFeature = (data) => {
    const { jobActions, addJobData } = this.props;
    const jobData = { ...addJobData };
    let jobDataFeature = Array.isArray(jobData.features)
      ? jobData.features.slice()
      : [];
    let priceSum = jobData.priceSum || 0;

    const findElementIndex = jobDataFeature.indexOf(data.type);
    if (findElementIndex !== -1) {
      jobDataFeature.splice(findElementIndex, 1);
      priceSum -= data.price;
    } else {
      jobDataFeature.push(data.type);
      priceSum += data.price;
    }

    jobActions.setJobAddData({
      features: jobDataFeature,
      priceSum,
    });
  };

  onSubmit = () => {
    const { nextStep } = this.props;
    nextStep();
  };

  render() {
    const { addJobData, t } = this.props;
    const { features = [], priceSum } = addJobData;

    return (
      <div className={styles.container}>
        <PriceSum sum={priceSum} />
        <div className={styles.content}>
          <div className={styles.step_heading}>
            <h3>{t('job.add_job.step3.title')}</h3>
            <p className={styles.sub_title}>
              {t('job.add_job.step3.description')}
            </p>
          </div>

          <div className={styles.service_type}>
            {[
              {
                type: 'video-recording', // id = 1
                title: t('job.add_job.video.title'),
                description: t('job.add_job.video.description'),
                price: 399,
                icon: VideoType,
              },
              {
                type: 'evaluation', // id =  2
                title: t('job.add_job.evaluation.title'),
                description: t('job.add_job.evaluation.description'),
                price: 249,
                icon: EvaluationTypeIcon,
              },
              {
                type: 'choose', // id =  3
                title: t('job.add_job.questionnaire.title'),
                description: t('job.add_job.questionnaire.description'),
                price: 149,
                icon: RadioMultipleType,
              },
              {
                type: 'location', // id =  4
                title: t('job.add_job.people_nearby.title'),
                description: t('job.add_job.people_nearby.description'),
                price: 88,
                icon: LocationType,
              },
            ].map((item, index) => {
              const isSelected = features.indexOf(item.type) !== -1;
              return (
                <div className={styles.item} key={index}>
                  <div className={styles.item_content}>
                    <div className={styles.icon}>
                      {/* <RocketOutlined /> */}
                      <img src={item.icon} alt="icon" />
                    </div>
                    <p className={styles.type_title}>{item.title}</p>
                    <p className={styles.description}>{item.description}</p>
                    <div className={styles.type_price}>
                      <span className={styles.price}>{item.price} SAR</span>
                    </div>
                    <div className={styles.button_wrapper}>
                      <label>
                        <input
                          type="checkbox"
                          name="job-type"
                          onChange={() => {
                            this.handleSelectFeature(item);
                          }}
                        />
                        <div
                          className={styles.button}
                          role="button"
                          onClick={() => {}}
                        >
                          {isSelected ? t('button.remove') : t('button.add')}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
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
)(withNamespaces()(Step3));
