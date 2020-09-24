import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import { message as notify, Popover } from "antd";
import classnames from "classnames";
import { withNamespaces } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";

// Styles
import styles from "./styles/job-detail.module.scss";

// Components
import HeaderJobDetail from "~components/common/HeaderJobDetail";
import Categories from "~components/jobs/Categories";
import DetailHeader from "~components/jobs/DetailHeader";
import CandidateItem from "~components/jobs/CandidateItem";
import LoadingWrapper from "~components/common/LoadingWrapper";
import JobDetailContentUser from "~components/jobs/JobDetailContentUser";

// Actions
import getJobCandidate from "./actions/getJobCandidate";
import setJobDetailData from "./actions/setJobDetailData";
import getCandidateDetail from "./actions/getCandidateDetail";
import getJobsList from "./actions/getJobsList";
import AddCustomCategory from "./AddCustomCategory";
import getCustomCategories from "./actions/getCustomCategories";
import createCustomCategory from "./actions/createCustomCategory";
import userMoveToCategory from "./actions/userMoveToCategory";

const queryString = require("query-string");

class JobDetail extends Component {
  state = {
    search: ""
  };

  /* handle select one candidate under a job and fetches his data */
  handleSelecteCandidate = candidate => {
    const { jobDetailActions, jobDetailData, match } = this.props;

    jobDetailActions.getCandidateDetail({
      id: candidate.id,
      user_id: candidate.User?.id,
      job_id: match?.params?.id
    });
  };

  /* handles pick one job and fetches its data */
  handleGetCandidate = () => {
    const { jobDetailActions, match } = this.props;

    const searchParams = queryString.parse(window.location.search);
    const data = { job_id: match?.params?.id };

    if (searchParams.qualified !== undefined) {
      try {
        data.qualified = JSON.parse(searchParams.qualified);
      } catch (error) {
        data.qualified = true;
      }
    }

    if (searchParams.category !== undefined) {
      data.folder = searchParams.category.toLowerCase();
    }

    jobDetailActions.getJobCandidate(data);
  };

  /* handle add a category for candidates */
  handleAddcategory = () => {
    const { modalActions } = this.props;
    modalActions.show("addCustomCategory");
  };

  /* handle select users */
  handleCheckAllUser = () => {
    const { jobDetailData, jobCandidate, jobDetailActions } = this.props;
    const isAllSelected = jobDetailData.checkedUsers.length === jobCandidate.length;

    if (isAllSelected) {
      jobDetailActions.setJobDetailData({
        ...jobDetailData,
        checkedUsers: []
      });
    } else {
      jobDetailActions.setJobDetailData({
        ...jobDetailData,
        checkedUsers: jobCandidate.map(item => item.id)
      });
    }
  };

  /* handle change user data after select another candidate */
  handleChangeCheckdUser = user => {
    const { jobDetailData, jobDetailActions } = this.props;

    const data = jobDetailData.checkedUsers ? jobDetailData.checkedUsers.slice() : [];
    const dataId = data.map(item => item.id);
    const findItem = dataId.indexOf(user.id);

    if (findItem === -1) {
      data.push(user);
    } else {
      data.splice(findItem, 1);
    }

    jobDetailActions.setJobDetailData({
      ...jobDetailData,
      checkedUsers: data
    });
  };

  /* handle move a user to a list */
  handleMoveUserToCategory = (folder = {}) => {
    const { match, jobDetailData, jobDetailActions } = this.props;
    const userIds = jobDetailData.checkedUsers
      ? jobDetailData.checkedUsers.map(item => item.id)
      : [];
    const data = {
      users_id: userIds,
      job_id: match?.params?.id,
      folder: folder.folder.toLowerCase(),
      folder_type: folder.folder_type
    };

    jobDetailActions.userMoveToCategory(data, {
      success: response => {
        const { message } = response;
        this.handleGetCandidate();
        jobDetailActions.setJobDetailData({
          ...jobDetailData,
          checkedUsers: []
        });
        notify.success(message);
      },
      fail: response => {
        const { message } = response;
        notify.error(message);
      }
    });
  };

  componentDidMount() {
    const { jobsActions, jobDetailActions, match } = this.props;
    this.handleGetCandidate();
    jobsActions.getJobsList();
    jobDetailActions.getCustomCategories({ job_id: match?.params?.id });
  }

  componentWillUnmount() {
    const { jobDetailActions, jobDetailData } = this.props;
    jobDetailActions.setJobDetailData({
      ...jobDetailData,
      selectedUser: null
    });
  }

  render() {
    const {
      jobDetailActions,
      isLoadingJobCandidate,
      jobCandidate = [],
      jobDetailData,
      isLoadingCandidateDetail,
      jobsList,
      isLoadingCustomCategories,
      customCategories,
      match,
      t
    } = this.props;

    const { search } = this.state;

    const jobId = match?.params?.id;

    return (
      <div>
        <HeaderJobDetail data={jobsList} jobId={match?.params?.id} />
        <LoadingWrapper isLoading={isLoadingJobCandidate}>
          <DetailHeader
            selected={jobDetailData.selectedUser}
            checkedUsers={jobDetailData.checkedUsers}
            customCategories={customCategories}
            onMoveUserToCategory={this.handleMoveUserToCategory}
            jobCandidate={jobCandidate}
          />
          <div className={styles.container}>
            {/* <Categories
              isLoading={isLoadingCustomCategories}
              data={customCategories}
              onAddCategory={this.handleAddcategory}
            /> */}
            <div className={styles.board}>
              <div className={styles.board_content}>
                <div className={styles.left_side}>
                  <div className={styles.search}>
                    {!!(
                      jobDetailData.checkedUsers && jobDetailData.checkedUsers.length
                    ) && (
                      <div className={styles.selected_all}>
                        <button type='button' onClick={this.handleCheckAllUser}>
                          {!!(jobDetailData.checkedUsers.length === jobCandidate.length)
                            ? "Deselect all"
                            : "Select all"}
                        </button>
                      </div>
                    )}

                    {/* Search bar */}
                    <div className={styles.search_wrapper}>
                      <input
                        type='search'
                        placeholder={t("job.search")}
                        value={search}
                        onChange={({ target }) => {
                          this.setState({
                            search: target.value
                          });
                        }}
                      />
                      <button className={styles.saerch_btn}>
                        <FontAwesomeIcon icon={["fas", "search"]} />
                      </button>
                    </div>
                  </div>

                  {/* filter and sort */}
                  <div className={styles.filter_sort}>
                    <Popover trigger='click'>
                      <span className={styles.sort}>
                        <FontAwesomeIcon icon={["fas", "sort-alpha-down"]} />
                        Sort
                      </span>
                    </Popover>

                    <span className={styles.filter}>
                      {" "}
                      <FontAwesomeIcon icon={["fas", "filter"]} />
                      Filter
                    </span>
                    <span className={styles.passed}>Passed</span>
                  </div>

                  <Scrollbars autoHide>
                    {/* job candidates */}
                    {jobCandidate
                      .filter(({ User }) => User.name.indexOf(search) !== -1)
                      .map(item => (
                        <CandidateItem
                          key={item.id}
                          item={item}
                          checkedUsers={jobDetailData.checkedUsers}
                          selected={jobDetailData.selectedUser}
                          onSelect={this.handleSelecteCandidate}
                          onCheckUser={this.handleChangeCheckdUser}
                        />
                      ))}
                  </Scrollbars>
                </div>

                <JobDetailContentUser
                  isLoading={isLoadingCandidateDetail}
                  selected={jobDetailData.selectedUser}
                  candidatesNumber={jobCandidate}
                />

                <div>Comments</div>
              </div>
            </div>
          </div>
        </LoadingWrapper>
        {/* <AddCustomCategory
          jobId={jobId}
          submitCb={() => {
            // TODO: categories call
            // this.handleGetCandidate();
            jobDetailActions.getCustomCategories({ job_id: jobId });
          }}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isLoadingJobCandidate: store.jobs.isLoadingJobCandidate,
  isLoadingCandidateDetail: store.jobs.isLoadingCandidateDetail,
  jobCandidate: store.jobs.jobCandidate,
  jobDetailData: store.jobs.jobDetailData,
  jobsList: store.jobs.jobsList,

  isLoadingCustomCategories: store.jobs.isLoadingCustomCategories,
  customCategories: store.jobs.customCategories
});

const mapDispatchToProps = dispatch => ({
  jobDetailActions: bindActionCreators(
    {
      getJobCandidate,
      setJobDetailData,
      getCandidateDetail,
      getCustomCategories,
      userMoveToCategory
    },
    dispatch
  ),
  jobsActions: bindActionCreators({ getJobsList }, dispatch),
  modalActions: bindActionCreators({ show }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(JobDetail));
