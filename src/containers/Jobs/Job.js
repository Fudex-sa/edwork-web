import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import moment from "moment";

import { SearchOutlined } from "@ant-design/icons";
import styles from "./styles/job.module.scss";
import classnames from "classnames";
import { Row, Col, message as notifi } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import HeaderDark from "~components/common/HeaderDark";
import { Button } from "~components/forms";
import JobsList from "~components/jobs/JobsList";
import getJobsList from "./actions/getJobsList";
import LoadingWrapper from "~components/common/LoadingWrapper";
import { Pagination } from "antd";
import { WelcomeUser } from "~components/user";
import Noavatar from "~assets/imgs/company_noavatar.svg";
import VerifyIcon from "~assets/imgs/verify_user.svg";

class Job extends Component {
  // state = {
  //   page: 0,
  //   search_word: ""
  // };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      search_word: "",
    };
  }

  componentDidMount() {
    this.getJobsList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.search_word !== prevState.search_word
    ) {
      this.getJobsList();
    }
  }

  getJobsList = async () => {
    const { jobsActions } = this.props;
    await jobsActions.getJobsList(this.state, {
      success: (response) => {
        const { message, data } = response;
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  };

  getJobsNext = async (page) => {
    const { jobsActions } = this.props;

    await jobsActions.getJobsList(
      { page: page },
      {
        success: (response) => {
          const { message, data } = response;
        },
        fail: (response) => {
          const { message } = response;
          notifi.error(message);
        },
      }
    );
  };

  goToCreateJob = () => {
    const { history } = this.props;
    history.push("/jobs/add");
  };

  goToJobDetail = (id) => {
    const { history } = this.props;
    history.push(`/job/detail/${id}`);
  };

  notifiWithPlanend = () => {
    notifi.error("Your 14 days has been ended");
  };

  render() {
    const { jobsListLoading, jobsList, jobsCount, t, userData } = this.props;
    const companyData = userData?.Company;
    const endPlan = moment(companyData.plan_finished_at);
    const daysLeft = endPlan.diff(moment(), "days") + 1;

    return (
      <div className={styles.jobsListPage}>
        {/* header */}
        <HeaderDark userinfo={userData} />

        {/* company data and welcome user */}
        <div className={styles.company_wrapper}>
          <div className={styles.company_logo}>
            {companyData?.logo_path ? (
              <img src={companyData.logo_path} alt="company logo" />
            ) : (
              <img
                src={Noavatar}
                alt="company logo"
                className={styles.noavatar}
              />
            )}
          </div>
          <p className={styles.company_name}>
            {companyData?.verified && (
              <img src={VerifyIcon} alt="verify-user" />
            )}
            {companyData?.name}
          </p>
          <WelcomeUser user={userData} />
        </div>

        {/* jobs list */}
        <div className={styles.container}>
          <div className={styles.head}>
            <div className={styles.actions}>
              <Button
                classStyle={styles.add_post_btn}
                text={`+ ${t("button.add_new_post")}`}
                shape="round"
                onClick={
                  daysLeft > 0 ? this.goToCreateJob : this.notifiWithPlanend
                }
              />
            </div>

            {/* search job */}
            <div className={styles.search}>
              <div className={styles.search_container}>
                <input
                  type="text"
                  name="search"
                  placeholder={t("job.search")}
                  onChange={(e) => {
                    this.setState({ search_word: e.target.value });
                  }}
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
                t("job.tab_head.title"),
                t("job.tab_head.status"),
                t("job.tab_head.city"),
                t("job.tab_head.expiresOn"),
                t("job.tab_head.applications"),
                t("job.tab_head.note"),
                t("job.tab_head.drop"),

              ]}
              // jobId={}
              data={jobsList}
              actions={{
                goToJobDetail: this.goToJobDetail,
              }}
            />
          </LoadingWrapper>

          {/* jobs list pagination */}
          <Pagination
            size="default"
            showTitle={false}
            showQuickJumper={false}
            showSizeChanger={false}
            showLessItems={false}
            className={styles.pagination}
            defaultCurrent={1}
            total={jobsCount}
            onChange={(currentPage) => {
              this.setState({ page: currentPage });
            }}
          />
        </div>

        <div className={styles.dashboard_footer}>
          <div className={styles.left}>
            <span className={styles.youtube}>
              <FontAwesomeIcon
                className={styles.arrow}
                icon={["fab", "youtube"]}
              />
              <span>Larn how to use the website</span>
            </span>
          </div>
          <div className={styles.right}>
            <span className={styles.email}>
              <FontAwesomeIcon
                className={styles.arrow}
                icon={["fas", "envelope"]}
              />
              <span>info@fursatak.app</span>
            </span>

            <span className={styles.phone}>
              <FontAwesomeIcon
                className={styles.arrow}
                icon={["fas", "phone-alt"]}
              />
              <span>0503117234</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  jobsListLoading: store.jobs.jobsListLoading,
  jobsList: store.jobs.jobsList,
  jobsCount: store.jobs.jobsCount,
});

const mapDispatchToProps = (dispatch) => ({
  jobsActions: bindActionCreators({ getJobsList }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Job));
