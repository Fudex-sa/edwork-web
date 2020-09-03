import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';

import { SearchOutlined } from '@ant-design/icons';
import styles from './styles/job.module.scss';
import classnames from 'classnames';

// Components
import HeaderDark from '~components/common/HeaderDark';
import { Button } from '~components/forms';
import JobsList from '~components/jobs/JobsList';
import getJobsList from './actions/getJobsList';
import LoadingWrapper from '~components/common/LoadingWrapper';

class Job extends Component {
  componentDidMount() {
    const { jobsActions } = this.props;
    jobsActions.getJobsList();
  }

  goToCreateJob = () => {
    const { history } = this.props;
    history.push('/jobs/add');
  };

  goToJobDetail = (id) => {
    const { history } = this.props;
    history.push(`/job/detail/${id}`);
  };

  render() {
    const { jobsListLoading, jobsList, t } = this.props;
    return (
      <div>
        <HeaderDark />

        <div className={styles.container}>
          <div className={styles.head}>
            <div className={styles.actions}>
              <Button
                classStyle={styles.add_post_btn}
                text={`+ ${t('button.add_new_post')}`}
                shape="round"
                onClick={this.goToCreateJob}
              />
            </div>
            <div className={styles.search}>
              <div className={styles.search_container}>
                <input
                  type="text"
                  name="search"
                  placeholder={t('job.search')}
                />
                <button type="button">
                  <SearchOutlined />
                </button>
              </div>
            </div>
          </div>
          <LoadingWrapper isLoading={jobsListLoading}>
            <JobsList
              headTitles={[
                t('job.tab_head.title'),
                t('job.tab_head.date'),
                t('job.tab_head.status'),
                t('job.tab_head.applications'),
                t('job.tab_head.action'),
                t('job.tab_head.note'),
              ]}
              data={jobsList}
              actions={{
                goToJobDetail: this.goToJobDetail,
              }}
            />
          </LoadingWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  jobsListLoading: store.jobs.jobsListLoading,
  jobsList: store.jobs.jobsList,
});

const mapDispatchToProps = (dispatch) => ({
  jobsActions: bindActionCreators({ getJobsList }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Job));
