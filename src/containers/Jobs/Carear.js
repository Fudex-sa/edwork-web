import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import { message as notifi } from "antd";

import styles from "./styles/job.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import JobsList from "~components/jobs/carearList";
import getCarearList from "./actions/getCarearList";
import LoadingWrapper from "~components/common/LoadingWrapper";
import { WelcomeUser } from "~components/user";
import Noavatar from "~assets/imgs/company_noavatar.svg";
import VerifyIcon from "~assets/imgs/verify_user.svg";

class Job extends Component {
  constructor(props){
    super(props)
    this.jobId = this.props.location
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props);
    this.getCarearList(id);
  }

  getCarearList = async (id) => {
    const { jobsActions } = this.props;
    await jobsActions.getCarearList(id, {
      fail: ({ message }) => {
        notifi.error(message);
      },
    });
  };

  render() {
    const { jobsListLoading, jobsList, company = {} } = this.props;
    return (
      <div className={styles.jobsListPage}>
        <div className={styles.company_wrapper + " pt-5"}>
          {company?.type === "sponserd" ? (
            <div
              className={
                styles.company_logo + " row d-flex justify-content-around"
              }
              style={{ width: "50%" }}
            >
              <div className="col-5">
                <img
                  src={company?.CompanyId?.logo_path || Noavatar}
                  alt="company logo"
                />
              </div>
              <div className="col-5">
                <img src={company.logo_path || Noavatar} alt="company logo" />
              </div>
            </div>
          ) : (
            <div className={styles.company_logo + " mt-5 row"}>
              <img src={company.logo_path || Noavatar} alt="company logo" />
            </div>
          )}
          <div className="font-class-1 mt-3">{company.description}</div>
        </div>

        {/* jobs list */}
        <div className={styles.container}>
          <LoadingWrapper isLoading={jobsListLoading}>
            <JobsList data={jobsList} jobId={this.jobId}/>
          </LoadingWrapper>
        </div>

        <div className={styles.dashboard_footer + " mt-5"}>
          <div className={styles.left}>
            <span className={styles.youtube}>
              <FontAwesomeIcon
                className={styles.arrow}
                icon={["fab", "youtube"]}
              />
              <span>Learn how to use the website</span>
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
  jobsListLoading: store.jobs.jobsListLoading,
  jobsList: store.jobs.jobsList,
  company: store.jobs.company,
});

const mapDispatchToProps = (dispatch) => ({
  jobsActions: bindActionCreators({ getCarearList }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Job));
